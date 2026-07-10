import { getCategories } from "../../actions"
import { useQuery} from '@tanstack/react-query'

export const useCategories =() =>{
    const {data, isLoading}= useQuery(
        {
            queryKey: ['categories'],
            queryFn: ()=> getCategories(),
            staleTime: 1000 * 60 *5,
        }
    );
    return {categories:data, isLoading};
}

