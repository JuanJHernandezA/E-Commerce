import {useMutation,useQueryClient} from '@tanstack/react-query'
import { createCategory } from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useCreateCategory =()=>{
    const queryClient= useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn:createCategory,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['categories']})
            navigate('/dashboard/categorias')
        },
        onError: (error) =>{
            toast.error('Ocurrió un error al crear la categoría')
            console.log(error)
        }
        
    });

    return {mutate, isPending}

}