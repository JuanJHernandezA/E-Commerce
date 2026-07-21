import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/dashboard'

export const DashboardLayout = () => {
  return (
    <div className='flex bg-gray-100 min-h-screen font-montserrat'>
      h
        <SideBar />
        <main className='container m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]'>
      <Outlet />
      </main>
    </div>
  )
}


