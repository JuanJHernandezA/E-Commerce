import {useMutation,useQueryClient} from '@tanstack/react-query'
import {updatedBrand} from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { BrandInput} from '../../interfaces';

export const useUpdateBrand =(id_brand:number)=>{
    const queryClient= useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: (data:BrandInput)=>updatedBrand(id_brand,data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['brands']})
            toast.success('Categoría actualizado',{
                position:'bottom-right'
            });
            navigate('/dashboard/marcas')
        },
        onError: (error) =>{
            console.log(error)
            toast.error('Ocurrió un error al actualizar la marca',{
                position:'bottom-right'
            })
            
        }
        
    });

    return {mutate, isPending}

}