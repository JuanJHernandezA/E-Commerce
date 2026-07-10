import { supabase } from '../supabase/client'

export const getProducts = async ( )=>{
    const {data: products, error} = await supabase.from('products').select('*, variants(*),brands(*),categories(*)').order('created_at' , {ascending:false});

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
}

export const getCategories = async () =>{
    const {data: categories, error} = await supabase.from('categories').select('*');

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return categories;
}

export const getBrands = async () =>{
    const {data:brands ,  error} = await supabase.from('brands').select('*');

     if (error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return brands;
}

export const getFilteredProducts = async ({page=1, brands = []}: {page:number, brands:string[]})=>{
   
    const itemsPerPage =10;
    const from = (page-1)*itemsPerPage;
    const to = from + itemsPerPage -1;
    let query = supabase.from('products')
                .select('*, variants(*),brands!inner(name_brand),categories(*)', {count:'exact'})
                .order('created_at' , {ascending:false})
                .range(from,to);

    if(brands.length >0 ){
        query = query.in('brands.name_brand', brands);
    }

    const {data, error, count} = await query;

    if (error){
        console.log(error.message);
        throw new Error(error.message);
    }
 
    return {data,count};

}