import { getBrands } from "../../actions"
import { useQuery} from '@tanstack/react-query'

export const useBrands =({page=1}:{page?:number}) =>{
    const {data, isLoading}= useQuery(
        {
            queryKey: ['brands',page],
            queryFn: ()=> getBrands(page),
            staleTime: 1000 * 60 *5,
        }
    );
    return {brands:data?.brands, isLoadingBrands:isLoading, totalBrands:data?.count ?? 0};
}

