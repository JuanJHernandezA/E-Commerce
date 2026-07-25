import toast from "react-hot-toast";
import type { BrandInput } from "../interfaces";
import { supabase } from "../supabase/client";

import { extractFilePath } from "../helpers";

export const createBrand = async (brandInput: BrandInput) => {
  try {
    const { data: brand, error: brandError } = await supabase
      .from("brands")
      .insert({
        name_brand: brandInput.name_brand,
    
        isActive: brandInput.isActive,
       
        description: brandInput.description,
        images: [],
      })
      .select()
      .single();

    if (brandError) throw new Error(brandError.message);

    const folderName = brand.id_brand;
    const uploadedImage = await Promise.all(
      brandInput.images.map(async (image) => {
        const {data,error} = await supabase.storage.from('brand_images').upload(`${folderName}/${brand.id_brand}-${image.name}`, image);
        if (error) throw new Error(error.message)

          const imageUrl = `${supabase.storage.from('brand_images').getPublicUrl(data.path).data.publicUrl}`;
          return imageUrl;
      }),
    );

    const {error:updatedError} = await supabase.from('brands').update({images:uploadedImage}).eq('id_brand',brand.id_brand)
    if (updatedError) throw new Error(updatedError.message);

    
    return brand;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado, vuelva a intentarlo");
  }
};

export const getBrandsWithProducts = async (isAdmin: boolean =false) => {

  // Si NO es admin, anidamos categories!inner DENTRO de products!inner
  const selectQuery = !isAdmin
    ? "*, products!inner(id, isActive, categories!inner(isActive))"
    : "*, products(id, isActive, categories(isActive))";

  let query = supabase
    .from("brands")
    .select(selectQuery);

  if (!isAdmin) {
    query = query
      .eq("isActive", true)                      // 1. Marca activa
      .eq("products.isActive", true)             // 2. Producto activo
      .eq("products.categories.isActive", true); // 3. Categoría del producto activa
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener marcas con productos:", error.message);
    throw new Error(error.message);
  }

  return (data || []).map((brand) => ({
    ...brand,
    quantity: brand.products ? brand.products.length : 0,
  }));
};

export const deleteBrand = async (id_brand: number) => {
  const {count, error: productBrandsError } = await supabase
    .from("products").select('id',{ count: "exact", head: true })
    .eq("brand", id_brand).limit(1);

  if (productBrandsError) throw new Error(productBrandsError.message);
 if (count && count > 0) {
  return toast.error('Hay productos asociados a esta marca', {
    position: 'bottom-right'
  });
}

  const { data: brandImages, error: brandImagesError } = await supabase
    .from("brands")
    .select("images")
    .eq("id_brand", id_brand)
    .maybeSingle();
  if (brandImagesError) throw new Error(brandImagesError.message);

  const { error: brandDeleteError } = await supabase
    .from("brands")
    .delete()
    .eq("id_brand", id_brand);
  if (brandDeleteError) throw new Error(brandDeleteError.message);
if (!brandImages) {
  console.warn("No hay imagenes de la marca.");
  return; // O manejar el caso según tu interfaz
}
  if (brandImages.images.length > 0) {
    const folderName = id_brand;
    const paths = brandImages.images.map((image) => {
      const fileName = image.split("/").pop();
      return `${folderName}/${fileName}`;
    });
    const { error: storageError } = await supabase.storage
      .from("brand_images")
      .remove(paths);
    if (storageError) throw new Error(storageError.message);
  }

  return  toast.success('Marca eliminada correctamente',
                {position:'bottom-right'}
            );
};

export const getBrands = async (
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
    .from("brands")
    .select(selectQuery, { count: "exact" })
    .order("name_brand", { ascending: true }) // Orden alfabético para selects
    .range(from, to);
  if (!isAdmin) {
    query = query.eq("isActive", true).eq("products.isActive", true);
  }
  const { data: brands, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const formattedBrands = (brands || []).map((br) => ({
    ...br,
    quantity: br.products?.[0]?.count ?? 0,
  }));

  return { brands: formattedBrands, count, isAdmin };
};

export const updatedBrand = async (
  id_brand: number,
  brandInput: BrandInput,
) => {
  const { data: currentBrand, error: currentBrandError } = await supabase
    .from("brands")
    .select("images")
    .eq("id_brand", id_brand)
    .single();
  if (currentBrandError) throw new Error(currentBrandError.message);

  const existingImages = currentBrand.images || [];

  const { data: updatedBrand, error: brandError } = await supabase
    .from("brands")
    .update({
      name_brand: brandInput.name_brand,
      isActive: brandInput.isActive,
      description: brandInput.description,
    })
    .eq("id_brand", id_brand)
    .select()
    .single();
  if (brandError) throw new Error(brandError.message);

  const folderName = id_brand;
  const validImages = brandInput.images.filter(Boolean) as Array<File | string>;
  const imagesToDelete = existingImages.filter(
    (image) => !validImages.includes(image),
  );

  const filesToDelete = imagesToDelete
    .map((image) => {
      try {
        return extractFilePath(image, "brand_images");
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path));

  if (filesToDelete.length > 0) {
    const { error: deleteImagesError } = await supabase.storage
      .from("brand_images")
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
          .from("brand_images")
          .upload(`${folderName}/${id_brand}-${image.name}`, image);
        if (error) throw new Error(error.message);

        const imageUrl = supabase.storage
          .from("brand_images")
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
    .from("brands")
    .update({ images: uploadedImages })
    .eq("id_brand", id_brand);
  if (updateImagesError) throw new Error(updateImagesError.message);

 
  return updatedBrand;
};

export const getBrandById = async (id_brand: number) => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id_brand", id_brand)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};