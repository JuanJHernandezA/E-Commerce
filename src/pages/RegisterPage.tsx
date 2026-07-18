import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRegister, useUser } from '../hooks'
import { LuLoader } from 'react-icons/lu'
import Loader from '../components/shared/Loader'

export const userRegisterSchema = z.object({
  email:z.string().email('El correo electrónico no es válido'),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(
      /[@$!%*?&._\-#]/,
      "Debe contener al menos un carácter especial (@$!%*?&._-#)"
    ),
  fullName: z.string().min(3, 'El nombre completo es requerido').trim(),
  phone: z.string()
    .regex(/^\+?[0-9]{7,15}$/, "El teléfono no es válido")
    .optional()
    .or(z.literal(""))
});
export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>

const RegisterPage = () => {

  const {register, handleSubmit, formState:{errors}} = useForm<UserRegisterFormValues>({
      defaultValues:{
        fullName:'',
        email:'',
        phone:'',
        password:''
      },
      resolver: zodResolver(userRegisterSchema)
  });

  const {mutate,isPending}=useRegister();
  const {session,isLoading}=useUser();

  const onRegister = handleSubmit((data)=>{
    const {email,password,fullName,phone}=data;

    mutate({email,password,fullName,phone})
  });

  if (isLoading) return <Loader />

  if (session) return <Navigate to='/' />
  return (
    <div className='h-full flex flex-col items-center mt-12 gap-5 '>
      <h1 className="text-4xl font-bold capitalize">
        Regístrate
      </h1>
      <p className="text-sm font-medium">
        Por favor, rellene los siguientes campos
      </p>

     {
      isPending? (
        <div className='w-full h-full flex justify-center mt-20'>
          <LuLoader className='animate-spin' size={60} />
        </div>
      ) :( <>
      <form action="" className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]' onSubmit={onRegister}>
        <input
    type="text"
    placeholder="Ingresa tu nombre completo"
    className={`w-full rounded-full border px-5 py-4 text-sm placeholder:text-black transition-colors
      ${
        errors.fullName
          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-slate-200 focus:border-black"
      }`}
    {...register("fullName")}
  />

  
    {errors.fullName && (
      <div className="min-h-[20px] w-full">
      <p className="pl-5 text-xs text-red-500">
        {errors.fullName.message}
      </p>
      </div>
    )}
  
         <input
    type="text"
    placeholder="Ingresa tu celular"
    className={`w-full rounded-full border px-5 py-4 text-sm placeholder:text-black transition-colors
      ${
        errors.phone
          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-slate-200 focus:border-black"
      }`}
    {...register("phone")}
  />

  
    {errors.phone && (
      <div className="min-h-[20px] w-full">
      <p className="pl-5 text-xs text-red-500">
        {errors.phone.message}
      </p>
       </div>
    )}
 
        <input
  type="email"
  placeholder="Ingresa tu correo electrónico"
  className={`w-full rounded-full border px-5 py-4 text-sm placeholder:text-black transition-colors
    ${
      errors.email
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-slate-200 focus:border-black"
    }`}
  {...register("email")}
/>


  {errors.email && (
    <div className="min-h-[20px] w-full">
    <p className="text-xs text-red-500 pl-5">
      {errors.email.message}
    </p>
    </div>
  )}


      <input
    type="password"
    placeholder="Ingresa tu contraseña"
    className={`w-full rounded-full border px-5 py-4 text-sm placeholder:text-black transition-colors
      ${
        errors.password
          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-slate-200 focus:border-black"
      }`}
    {...register("password")}
  />

  
    {errors.password && (
      <div className="min-h-[20px] w-full">
      <p className="pl-5 text-xs text-red-500">
        {errors.password.message}
      </p>
      </div>
    )}
  
      <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
        Registrarme
      </button>

      <p className='text-sm text-stone-800'>
        ¿Ya tienes una cuenta?
        <Link to='/login' className='underline ml-2'>Inicia sesión</Link>
      </p>
      
      </form>
      </>)
     }
    </div>
  )
}

export default RegisterPage
