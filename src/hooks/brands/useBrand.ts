import {useQuery} from '@tanstack/react-query'
import { getBrandById } from '../../actions'

export const useBrand = (id_brand:number)=>{
    const { data:brand,isLoading, isError}=useQuery({queryKey:['brand',id_brand],queryFn:()=> getBrandById(id_brand), retry:false});
        return {
            brand, isError,isLoading
        }
}