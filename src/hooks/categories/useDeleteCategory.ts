import {useMutation,useQueryClient} from '@tanstack/react-query'
import { deleteCategory } from '../../actions';
import toast from 'react-hot-toast';

export const useDeleteCategory =()=>{
    const queryClient= useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn:deleteCategory,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['categories']})
            
        },
        onError: (error) =>{
            console.log(error)
            toast.error('Ocurrió un error al eliminar la categoría',
                {position:'bottom-right'}
            )
            console.log(error)
        }
        
    });

    return {mutate, isPending}

}