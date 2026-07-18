import React, { useState } from 'react'
import { LuLoader } from 'react-icons/lu';
import { Link, Navigate } from 'react-router-dom'
import { useLogin, useUser } from '../hooks'
import Loader from '../components/shared/Loader';
const LoginPage = () => {

  const [email, setEmail] =useState('customer@gmail.com');
  const [password, setPassword] =useState('Customer1*');

  const {mutate,isPending}= useLogin();
  const {session,isLoading}=useUser();
  const onLogin =(e:React.FormEvent) =>{
    e.preventDefault();
    mutate({email,password})
  }
  if (isLoading) return <Loader />

  if (session) return <Navigate to='/' />

  return (
    <div className='h-full flex flex-col items-center mt-12 gap-5'>
      <h1 className="text-4xl font-bold capitalize">
        Iniciar sesión
      </h1>
      <p className="text-sm font-medium">
        ¡Qué bueno tenerte de vuelta!
      </p>

      {
        isPending ? (
          <div className='w-full h-full flex justify-center mt-20'>
                    <LuLoader className='animate-spin' size={60} />
                  </div>
        ) : (
          <>
      <form action="" className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]' onSubmit={onLogin}>
        <input type="email" placeholder='Ingresa tu correo electrónico' className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
        value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Ingresa tu contraseña' className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full' 
      value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full cursor-pointer">
        Iniciar sesión
      </button>

      <p className='text-sm text-stone-800'>
        ¿No tienes una cuenta?
        <Link to='/registro' className='underline ml-2'>Regístrate</Link>
      </p>
      
      </form>
      </>
        )
      }
      
    </div>
  )
}

export default LoginPage
