import toast from "react-hot-toast";

import type { CategoryInput } from "../interfaces";
import { supabase } from "../supabase/client";

import { extractFilePath } from "../helpers";

export const createCategory = async (categoryInput: CategoryInput) => {
  try {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .insert({
        name_category: categoryInput.name_category,
    
        isActive: categoryInput.isActive,
       
        description: categoryInput.description,
        images: [],
      })
      .select()
      .single();

    if (categoryError) throw new Error(categoryError.message);

    const folderName = category.id_category;
    const uploadedImage = await Promise.all(
      categoryInput.images.map(async (image) => {
        const {data,error} = await supabase.storage.from('category_images').upload(`${folderName}/${category.id_category}-${image.name}`, image);
        if (error) throw new Error(error.message)

          const imageUrl = `${supabase.storage.from('category_images').getPublicUrl(data.path).data.publicUrl}`;
          return imageUrl;
      }),
    );

    const {error:updatedError} = await supabase.from('categories').update({images:uploadedImage}).eq('id_category',category.id_category)
    if (updatedError) throw new Error(updatedError.message);

    
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado, vuelva a intentarlo");
  }
};

export const getCategoriesWithProducts = async (isAdmin: boolean =false) => {

  // Si no es admin, anidamos brands!inner DENTRO de products!inner
  const selectQuery = !isAdmin
    ? "*, products!inner(id, isActive, brands!inner(isActive))"
    : "*, products(id, isActive, brands(isActive))";

  let query = supabase
    .from("categories")
    .select(selectQuery);

  if (!isAdmin) {
    query = query
      .eq("isActive", true)                  // 1. Categoría activa
      .eq("products.isActive", true)         // 2. Al menos un producto activo
      .eq("products.brands.isActive", true); // 3. La marca de ese producto debe estar activa
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener categorías:", error.message);
    throw new Error(error.message);
  }

  return (data || []).map((category) => ({
    ...category,
    quantity: category.products ? category.products.length : 0,
  }));
};

export const deleteCategory = async (id_category: number) => {
  const {count, error: productCategoriesError } = await supabase
    .from("products").select('id',{ count: "exact", head: true })
    .eq("category", id_category);

  if (productCategoriesError) throw new Error(productCategoriesError.message);
 if (count && count > 0) {
  return toast.error('Hay productos asociados a esta categoría', {
    position: 'bottom-right'
  });
}

  const { data: categoryImages, error: categoryImagesError } = await supabase
    .from("categories")
    .select("images")
    .eq("id_category", id_category)
    .maybeSingle();
  if (categoryImagesError) throw new Error(categoryImagesError.message);

  const { error: categoryDeleteError } = await supabase
    .from("categories")
    .delete()
    .eq("id_category", id_category);
  if (categoryDeleteError) throw new Error(categoryDeleteError.message);
  if (!categoryImages) {
  console.warn("No hay imagenes de la categoría.");
  return; // O manejar el caso según tu interfaz
}
  if (categoryImages.images.length > 0) {
    const folderName = id_category;
    const paths = categoryImages.images.map((image) => {
      const fileName = image.split("/").pop();
      return `${folderName}/${fileName}`;
    });
    const { error: storageError } = await supabase.storage
      .from("category_images")
      .remove(paths);
    if (storageError) throw new Error(storageError.message);
  }

  return toast.success('Categoría eliminado correctamente',
                {position:'bottom-right'}
            );
};

export const getCategories = async (
  page: number,
  limit: number = 10,
  isAdmin: boolean = false,
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const selectQuery = !isAdmin
    ? "*, products!inner(count)"
    : "*, products(count)";
  let query = supabase
    .from("categories")
    .select(selectQuery, { count: "exact" })
    .order("name_category", { ascending: true })
    .range(from, to);
  if (!isAdmin) {
    query = query.eq("isActive", true).eq("products.isActive", true);
  }
  const { data: categories, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  const formattedCategories = (categories || []).map((cat) => ({
    ...cat,
    quantity: cat.products?.[0]?.count ?? 0,
  }));

  return { categories: formattedCategories, count };
};

export const updatedCategory = async (
  id_category: number,
  categoryInput: CategoryInput,
) => {
  const { data: currentCategory, error: currentCategoryError } = await supabase
    .from("categories")
    .select("images")
    .eq("id_category", id_category)
    .single();
  if (currentCategoryError) throw new Error(currentCategoryError.message);

  const existingImages = currentCategory.images || [];

  const { data: updatedCategory, error: categoryError } = await supabase
    .from("categories")
    .update({
      name_category: categoryInput.name_category,
      isActive: categoryInput.isActive,
      description: categoryInput.description,
    })
    .eq("id_category", id_category)
    .select()
    .single();
  if (categoryError) throw new Error(categoryError.message);

  const folderName = id_category;
  const validImages = categoryInput.images.filter(Boolean) as Array<File | string>;
  const imagesToDelete = existingImages.filter(
    (image) => !validImages.includes(image),
  );

  const filesToDelete = imagesToDelete
    .map((image) => {
      try {
        return extractFilePath(image, "category_images");
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path));

  if (filesToDelete.length > 0) {
    const { error: deleteImagesError } = await supabase.storage
      .from("category_images")
      .remove(filesToDelete);
    if (deleteImagesError) {
      console.log(deleteImagesError);
      throw new Error(deleteImagesError.message);
    } else {
      console.log(`Imagenes eliminadas: ${filesToDelete.join(", ")}`);
    }
  }

  const uploadedImages = await Promise.all(
    validImages.map(async (image) => {
      if (image instanceof File) {
        const { data, error } = await supabase.storage
          .from("category_images")
          .upload(`${folderName}/${id_category}-${image.name}`, image);
        if (error) throw new Error(error.message);

        const imageUrl = supabase.storage
          .from("category_images")
          .getPublicUrl(data.path).data.publicUrl;
        return imageUrl;
      } else if (typeof image === "string") {
        return image;
      } else {
        throw new Error("Tipo de imagen no soportado.");
      }
    }),
  );

  const { error: updateImagesError } = await supabase
    .from("categories")
    .update({ images: uploadedImages })
    .eq("id_category", id_category);
  if (updateImagesError) throw new Error(updateImagesError.message);

 
  return updatedCategory;
};



export const getCategoryById = async (id_category: number) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id_category", id_category)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};