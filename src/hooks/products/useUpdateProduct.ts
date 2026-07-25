import {useMutation,useQueryClient} from '@tanstack/react-query'
import {updatedProduct } from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { ProductInput } from '../../interfaces';

export const useUpdateProduct =(productId:string)=>{
    const queryClient= useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: (data:ProductInput)=>updatedProduct(productId,data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']})
            toast.success('Producto actualizado',{
                position:'bottom-right'
            });
            navigate('/dashboard/productos')
        },
        onError: (error) =>{
            console.log(error)
            toast.error('Ocurrió un error al actualizar el producto',{
                position:'bottom-right'
            })
            
        }
        
    });

    return {mutate, isPending}

}