import {useMutation,useQueryClient} from '@tanstack/react-query'
import {updatedCategory} from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { CategoryInput} from '../../interfaces';

export const useUpdateCategory =(id_category:number)=>{
    const queryClient= useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn: (data:CategoryInput)=>updatedCategory(id_category,data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['categories']})
            toast.success('Categoría actualizado',{
                position:'bottom-right'
            });
            navigate('/dashboard/categorias')
        },
        onError: (error) =>{
            console.log(error)
            toast.error('Ocurrió un error al actualizar la categoría',{
                position:'bottom-right'
            })
            
        }
        
    });

    return {mutate, isPending}

}