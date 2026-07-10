import {useQuery} from '@tanstack/react-query'
import { getProuctBySlug } from '../../actions'

export const useProduct = (slug:string)=>{
    const { data:product,isLoading, isError}=useQuery({queryKey:['product',slug],queryFn:()=> getProuctBySlug(slug), retry:false});
        return {
            product, isError,isLoading
        }
}