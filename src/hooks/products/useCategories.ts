import { getCategories } from "../../actions"
import { useQuery} from '@tanstack/react-query'

export const useCategories =({page=1}:{page?:number}) =>{
    const {data, isLoading}= useQuery(
        {
            queryKey: ['categories',page],
            queryFn: ()=> getCategories(page),
            staleTime: 1000 * 60 *5,
        }
    );
    return {categories:data?.categories, isLoadingCategories:isLoading, totalCategories:data?.count ?? 0};
}

