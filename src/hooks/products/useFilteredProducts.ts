import { useQuery } from "@tanstack/react-query"
import { getFilteredProducts } from "../../actions"

export const useFilteredProducts = ({page, brands}: {page:number, brands:string[]} )=>{
    const {data, isLoading }= useQuery (
        {queryKey: ['filteredProducts', page, brands],
            queryFn: () => getFilteredProducts({page, brands}),
            retry: false,
        }
    )
    console.log(getFilteredProducts({page, brands}))

    return {data:data?.data, isLoading, totalProducts:data?.count ?? 0}
}