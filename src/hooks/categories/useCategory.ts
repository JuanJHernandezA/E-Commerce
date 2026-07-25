import {useQuery} from '@tanstack/react-query'
import { getCategoryById } from '../../actions'

export const useCategory = (id_category:number)=>{
    const { data:category,isLoading, isError}=useQuery({queryKey:['category',id_category],queryFn:()=> getCategoryById(id_category), retry:false});
        return {
            category, isError,isLoading
        }
}