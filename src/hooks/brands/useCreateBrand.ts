import {useMutation,useQueryClient} from '@tanstack/react-query'
import { createBrand } from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useCreateBrand =()=>{
    const queryClient= useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationFn:createBrand,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['brands']})
            navigate('/dashboard/marcas')
        },
        onError: (error) =>{
            toast.error('Ocurrió un error al crear la marca')
            console.log(error)
        }
        
    });

    return {mutate, isPending}

}