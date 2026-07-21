import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { TableBrand } from '../../components/dashboard'

export const DashboardBrandsPage = () => {
  return (
    <div className='h-full flex flex-col gap-2'>
      <Link to='/dashboard/categories/new' className='bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'>
      <IoAddCircleOutline className='inline-block' />
      Nueva marca
      </Link>
      <TableBrand/>
    </div>
  )
}


