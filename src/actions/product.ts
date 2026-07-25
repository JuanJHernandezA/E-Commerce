import { extractFilePath } from "../helpers";
import type { ProductInput } from "../interfaces";
import { supabase } from "../supabase/client";


export const getProducts = async (page: number, isAdmin: boolean = false) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants(*),brands(*),categories(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);
  if (!isAdmin) {
    query = query.eq("isActive", true);
  }
  const { data: products, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { products, count };
};

export const getFilteredProducts = async ({
  page = 1,
  brands = [],
  categories = [],
  isAdmin = false,
}: {
  page: number;
  brands: string[];
  categories: string[];
  isAdmin: boolean;
}) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select(
      "*, variants(*),brands!inner(name_brand,isActive),categories!inner(name_category,isActive)",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!isAdmin) {
    query = query
      .eq("isActive", true)
      .eq("brands.isActive", true)
      .eq("categories.isActive", true);
  }
  if (brands.length > 0) {
    query = query.in("brands.name_brand", brands);
  }

  if (categories.length > 0) {
    query = query.in("categories.name_category", categories);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { data, count };
};

export const getRecentProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*),brands(*),categories(*)")
    .order("created_at", { ascending: false })
    .eq("isActive", true)
    .limit(4);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return products;
};

export const getRandomProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*),brands(*),categories(*)")
    .eq("isActive", true)
    .limit(20);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return randomProducts;
};

export const getProuctBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("isActive", true)
    .ilike("name", `%${searchTerm}%`);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const createProduct = async (productInput: ProductInput) => {
  try {
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: productInput.name,
        brand: productInput.brand,
        category: productInput.category,
        isActive: productInput.isActive,
        slug: productInput.slug,
        features: productInput.features,
        description: productInput.description,
        images: [],
      })
      .select()
      .single();

    if (productError) throw new Error(productError.message);

    const folderName = product.id;
    const uploadedImage = await Promise.all(
      productInput.images.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(`${folderName}/${product.id}-${image.name}`, image);
        if (error) throw new Error(error.message);

        const imageUrl = `${supabase.storage.from("product-images").getPublicUrl(data.path).data.publicUrl}`;
        return imageUrl;
      }),
    );

    const { error: updatedError } = await supabase
      .from("products")
      .update({ images: uploadedImage })
      .eq("id", product.id);
    if (updatedError) throw new Error(updatedError.message);

    const variants = productInput.variants.map((variant) => ({
      product_id: product.id,
      stock: variant.stock,
      price: variant.price,
      color: variant.color,
      storage: variant.storage,
      color_name: variant.colorName,
    }));

    const { error: variantsError } = await supabase
      .from("variants")
      .insert(variants);
    if (variantsError) throw new Error(variantsError.message);

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado, vuelva a intentarlo");
  }
};

export const deleteProduct = async (productId: string) => {
  const { error: variantsError } = await supabase
    .from("variants")
    .delete()
    .eq("product_id", productId);

  if (variantsError) throw new Error(variantsError.message);

  const { data: productImages, error: productImagesError } = await supabase
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (productImagesError) throw new Error(productImagesError.message);

  const { error: productDeleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  if (productDeleteError) throw new Error(productDeleteError.message);

  if (productImages.images.length > 0) {
    const folderName = productId;
    const paths = productImages.images.map((image) => {
      const fileName = image.split("/").pop();
      return `${folderName}/${fileName}`;
    });
    const { error: storageError } = await supabase.storage
      .from("product-images")
      .remove(paths);
    if (storageError) throw new Error(storageError.message);
  }

  return true;
};

export const updatedProduct = async (
  productId: string,
  productInput: ProductInput,
) => {
  const { data: currentProduct, error: currentProductError } = await supabase
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (currentProductError) throw new Error(currentProductError.message);

  const existingImages = currentProduct.images || [];

  const { data: updatedProduct, error: productError } = await supabase
    .from("products")
    .update({
      name: productInput.name,
      brand: productInput.brand,
      category: productInput.category,
      isActive: productInput.isActive,
      slug: productInput.slug,
      features: productInput.features,
      description: productInput.description,
    })
    .eq("id", productId)
    .select()
    .single();
  if (productError) throw new Error(productError.message);

  const folderName = productId;
  const validImages = productInput.images.filter(Boolean) as Array<File | string>;
  const imagesToDelete = existingImages.filter(
    (image) => !validImages.includes(image),
  );

  const filesToDelete = imagesToDelete
    .map((image) => {
      try {
        return extractFilePath(image, "product-images");
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path));

  if (filesToDelete.length > 0) {
    const { error: deleteImagesError } = await supabase.storage
      .from("product-images")
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
          .from("product-images")
          .upload(`${folderName}/${productId}-${image.name}`, image);
        if (error) throw new Error(error.message);

        const imageUrl = supabase.storage
          .from("product-images")
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
    .from("products")
    .update({ images: uploadedImages })
    .eq("id", productId);
  if (updateImagesError) throw new Error(updateImagesError.message);

  const existingVariants = productInput.variants.filter((v) => v.id);
  const newVariants = productInput.variants.filter((v) => !v.id);

  if (existingVariants.length > 0) {
    const { error: updateVariantsError } = await supabase
      .from("variants")
      .upsert(
        existingVariants.map((variant) => ({
          id: variant.id,
          product_id: productId,
          stock: variant.stock,
          price: variant.price,
          storage: variant.storage,
          color: variant.color,
          color_name: variant.colorName,
        })),
        { onConflict: "id" },
      );
    if (updateVariantsError) throw new Error(updateVariantsError.message);
  }

  let newVariantIds: string[] = [];

  if (newVariants.length > 0) {
    const { data, error: insertVariantError } = await supabase
      .from("variants")
      .insert(
        newVariants.map((variant) => ({
          product_id: productId,
          stock: variant.stock,
          price: variant.price,
          storage: variant.storage,
          color: variant.color,
          color_name: variant.colorName,
        })),
      )
      .select();
    if (insertVariantError) throw new Error(insertVariantError.message);

    newVariantIds = data.map((variant) => variant.id);
  }

  const currentVariantIds = [
    ...existingVariants.map((v) => v.id),
    ...newVariantIds,
  ];

  const { error: deleteVariantsError } = await supabase
    .from("variants")
    .delete()
    .eq("product_id", productId)
    .not(
      "id",
      "in",
      `(${currentVariantIds ? currentVariantIds.join(",") : 0})`,
    );
  if (deleteVariantsError) throw new Error(deleteVariantsError.message);
  return updatedProduct;
};
