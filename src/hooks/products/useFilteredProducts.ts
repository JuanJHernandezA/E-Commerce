import { useQuery } from "@tanstack/react-query"
import { getBrandsWithProducts, getCategoriesWithProducts, getFilteredProducts } from "../../actions"
import type { Brand, Category } from "../../interfaces"

export const useFilteredProducts = ({page, brands, categories}: {page:number, brands:string[] , categories: string[] })=>{
    const {data, isLoading }= useQuery (
        {queryKey: ['filteredProducts', page, brands, categories],
            queryFn: () => getFilteredProducts({page, brands, categories}),
            retry: false,
        }
    )

    return {data:data?.data, isLoading, totalProducts:data?.count ?? 0}
}

export const useBrandsWithProducts = ()=>{
    const {data, isLoading }= useQuery (
        {queryKey: ['brandsWithProducts'],
            queryFn: () => getBrandsWithProducts(),
            retry: false,
        }
    )

    return {brandsFiltered:data, isLoadingFilterBrand:isLoading}
}

export const useCategoriesWithProducts = ()=>{
    const {data, isLoading }= useQuery (
        {queryKey: ['categoriesWithProducts'],
            queryFn: () => getCategoriesWithProducts(),
            retry: false,
        }
    )

    return {categoriesFiltered:data, isLoadingFilterCategory:isLoading}
}