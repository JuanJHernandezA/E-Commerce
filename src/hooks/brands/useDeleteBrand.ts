import {useMutation,useQueryClient} from '@tanstack/react-query'
import { deleteBrand } from '../../actions';
import toast from 'react-hot-toast';

export const useDeleteBrand =()=>{
    const queryClient= useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn:deleteBrand,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['brands']})
           
        },
        onError: (error) =>{
            console.log(error)
            toast.error('Ocurrió un error al eliminar la marca',
                {position:'bottom-right'}
            )
            console.log(error)
        }
        
    });

    return {mutate, isPending}

}