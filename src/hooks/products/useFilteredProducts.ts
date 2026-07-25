import { useQuery } from "@tanstack/react-query"
import { getBrandsWithProducts, getCategoriesWithProducts, getFilteredProducts } from "../../actions"

import { useAdminAuth } from "../auth/useAdminAuth"

export const useFilteredProducts = ({page, brands, categories}: {page:number, brands:string[] , categories: string[] })=>{
    const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth()
    const {data, isLoading }= useQuery (
        {queryKey: ['filteredProducts', page, brands, categories, isAdmin],
            queryFn: () => getFilteredProducts({page, brands, categories, isAdmin}),
            retry: false,
            enabled: !isLoadingAuth,
        }
    )

    return {data:data?.data, isLoading, totalProducts:data?.count ?? 0}
}

export const useBrandsWithProducts = ()=>{
    const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth()
    const {data, isLoading }= useQuery (
        {queryKey: ['brandsWithProducts',isAdmin],
            queryFn: () => getBrandsWithProducts(isAdmin),
            retry: false,
            enabled: !isLoadingAuth,
        }
    )

    return {brandsFiltered:data, isLoadingFilterBrand:isLoading}
}

export const useCategoriesWithProducts = ()=>{
    const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth()
    const {data, isLoading }= useQuery (
        {queryKey: ['categoriesWithProducts',isAdmin],
            queryFn: () => getCategoriesWithProducts(isAdmin),
            retry: false,
            enabled: !isLoadingAuth,
        }
    )


    return {categoriesFiltered:data, isLoadingFilterCategory:isLoading}
}