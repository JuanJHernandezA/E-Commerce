import { supabase } from '../supabase/client'
interface IAuthLogin {
    email: string,
    password: string
}

interface IAuthRegister{
    email:string,
    password:string,
    fullName:string,
    phone?:string
}

export const signUp = async ({email, password, fullName, phone}: IAuthRegister)=>{
        try {
            const {data,error}= await supabase.auth.signUp({email,password});
            if(error){
                throw new Error(error.message)
            }

            const userId = data.user?.id;

            if (!userId) {
                throw new Error('Error al obtener el id del usuario')
            }

            const {error:signInError} = await supabase.auth.signInWithPassword({
                email,password
            })

            if(signInError){
                console.log(signInError)
                throw new Error("Email o contraseña incorrectos")
            }

            const {error: roleError} = await supabase.from('user_roles').insert({user_id:userId, role:'customer'})

            if(roleError){
                console.log(roleError)
                throw new Error("Error al registrar el rol del usuario")
            }

            const {error:customerError} = await supabase.from('customers').insert({
                user_id:userId, full_name:fullName, phone, email
            })

            if(customerError){
                console.log(customerError)
                throw new Error("Error al registrar los datos del usuario")
            }

            return data;
        } catch (error) {
            console.log(error)
            throw new Error('Error al registrar usuario')
        }
};

export const signIn = async ({email,password}:IAuthLogin)=>{
    const {data,error} =await supabase.auth.signInWithPassword({
        email,password
    });

    if(error){
                console.log(error)
                throw new Error("Email o contraseña incorrectos")
            }

            return data;


};


export const signOut = async ()=>{
    const {error} =await supabase.auth.signOut();
    if(error){
                console.log(error)
                throw new Error("Error al cerrar sesión")
            }
}

export const getSession = async ()=>{
    const {data, error} =await supabase.auth.getSession();
    if(error){
                console.log(error)
                throw new Error("Error al obtener la sesión")
            }

            return data;
};
export const getUserData = async (userId:string) =>{
    const {data,error} = await supabase.from('customers').select('*').eq('user_id',userId).single()
if(error){
                console.log(error)
                throw new Error("Error al obtener datos del usuario")
            }

            return data;
}