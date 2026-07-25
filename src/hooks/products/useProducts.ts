import { getProducts} from "../../actions"
import { useQuery} from '@tanstack/react-query'

import { useAdminAuth } from "../auth/useAdminAuth";

export const useProducts =({page=1}:{page?:number}) =>{
    const { isAdmin, isLoading: isLoadingAuth } = useAdminAuth()
    const {data, isLoading}= useQuery(
        {
            queryKey: ['products',page, isAdmin],
            queryFn: ()=> getProducts(page, isAdmin),
            staleTime: 1000 * 60 *5,
            enabled: !isLoadingAuth,
        }
    );
    return {products:data?.products, isLoading, totalProducts:data?.count ?? 0};
}

