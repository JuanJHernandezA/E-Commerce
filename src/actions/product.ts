import type { Brand, Category } from '../interfaces';
import { supabase } from '../supabase/client'

export const getProducts = async (page:number)=>{
   const itemsPerPage =10;
    const from = (page-1)*itemsPerPage;
    const to = from + itemsPerPage -1;
    const {data: products, error,count} = await supabase.from('products').select('*, variants(*),brands(*),categories(*)',{count:'exact'}).order('created_at' , {ascending:false}).range(from,to);

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return {products,count};
}
export const getCategories = async (page:number)=>{
   const itemsPerPage =10;
    const from = (page-1)*itemsPerPage;
    const to = from + itemsPerPage -1;
    const {data: categories, error,count} = await supabase.from('categories').select('*, products(count)',{count:'exact'}).order('created_at' , {ascending:false}).range(from,to);

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

    const formattedCategories = categories.map((cat) => ({
    ...cat,
    quantity: cat.products?.[0]?.count ?? 0,
  }));

    return {categories:formattedCategories,count};
}
export const getBrands = async (page:number)=>{
   const itemsPerPage =10;
    const from = (page-1)*itemsPerPage;
    const to = from + itemsPerPage -1;
    const {data: brands, error,count} = await supabase.from('brands').select('*, products(count)',{count:'exact'}).order('created_at' , {ascending:false}).range(from,to);

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

     const formattedBrands = brands.map((br) => ({
    ...br,
    quantity: br.products?.[0]?.count ?? 0,
  }));

    return {brands:formattedBrands,count};
}



export const getFilteredProducts = async ({page=1, brands = [], categories=[]}: {page:number, brands:string[], categories: string[]})=>{
   
    const itemsPerPage =10;
    const from = (page-1)*itemsPerPage;
    const to = from + itemsPerPage -1;
    let query = supabase.from('products')
                .select('*, variants(*),brands!inner(name_brand),categories(name_category)', {count:'exact'})
                .order('created_at' , {ascending:false})
                .range(from,to);

    if(brands.length >0 ){
        query = query.in('brands.name_brand', brands);
    }

    if(categories.length>0){
        query=query.in('categories.name_category', categories);
    }

    const {data, error, count} = await query;

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }
 
    return {data,count};

}

export const getBrandsWithProducts = async () => {

  const { data, error } = await supabase
    .from('brands')
    .select('*, products!inner(id)');

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data.map(brand => ({
    ...brand,
    quantity: brand.products.length
  }));
};

export const getCategoriesWithProducts = async () => {

  const { data, error } = await supabase
    .from('categories')
    .select('*, products!inner(id)');

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data.map(category => ({
    ...category,
    quantity: category.products.length
  }));
};

export const getRecentProducts = async ()=>{
    const {data:products,error}= await supabase.from('products').select('*, variants(*),brands(*),categories(*)').order('created_at' , {ascending:false}).limit(4);
    if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return products;
}

export const getRandomProducts = async ()=>{
    const {data:products,error}= await supabase.from('products').select('*, variants(*),brands(*),categories(*)').limit(20);


    if (error) {
    console.error(error.message);
    throw new Error(error.message);
    }

    const randomProducts = products.sort(()=> 0.5 - Math.random()).slice(0,4);

  return randomProducts;
}

export const getProuctBySlug = async (slug:string)=>{
  const {data, error} = await supabase.from('products').select('*, variants(*)').eq('slug', slug).single();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
    }
    return data;
}

export const searchProducts = async (searchTerm:string) =>{
  const {data, error} = await supabase.from('products').select('*, variants(*)').ilike('name',`%${searchTerm}%`);
  
  
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
    }
    return data;
}