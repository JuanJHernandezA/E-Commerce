
import type { JSONContent } from "@tiptap/react";
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
    isActive:boolean;
    images:string[] ;
    description:Json
}

export interface Category{
    id_category:number;
    name_category:string;
    isActive:boolean;
    images:string[];
    description:Json
}

export interface Product {
    id:string;
    name:string;
    isActive:boolean;
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

export interface ProductInput {
    name:string;
    brand:number;
    category:number;
    slug:string;
    isActive:boolean;
    features:string[];
    description: JSONContent;
    images:File[];
    variants : VariantInput[]

}

export interface VariantInput {
    id?: string;
    stock:number;
    price:number;
    color:string;
    storage:string;
    colorName:string
}
export interface CategoryInput {
    name_category:string;
    isActive:boolean;
    description: JSONContent;
    images:File[]

}
export interface BrandInput {
    name_brand:string;
    isActive:boolean;
    description: JSONContent;
    images:File[]

}