import { getBrands } from "../../actions"
import { useQuery} from '@tanstack/react-query'

export const useBrands =() =>{
    const {data, isLoading}= useQuery(
        {
            queryKey: ['brands'],
            queryFn: ()=> getBrands(),
            staleTime: 1000 * 60 *5,
        }
    );
    return {brands:data, isLoadingBrands:isLoading};
}

