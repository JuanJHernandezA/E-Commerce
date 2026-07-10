
import type { Json } from "../supabase/supabase";

export interface Color {
    name:string;
    color:string; price:number;
}

export interface VariantProduct{

 id:string;
        stock:number;
        price:number;
        storage:string;
        color:string;
        color_name:string;

}

export interface Brand {
    id_brand:number;
    name_brand:string;
    description:string | null
}

export interface Category{
    id_category:number;
    name_category:string;
    description:string | null
}

export interface Product {
    id:string;
    name:string;
    // brand:Brand[];
    // category: Category[];
    slug:string;
    features: string[];
    description: Json;
    images:string[];
    created_at: string;
    variants:VariantProduct[];
}

export interface PreparedProducts {
    id:string;
    name:string;
    // brand:Brand[];
    // category:Category[];
    slug:string;
    features: string[];
    description: Json;
    images:string[];
    created_at: string;
    price: number;
    colors: {
        name: string;
        color:string
    } [];
    variants:VariantProduct[];
}