import React, { useEffect, useState } from 'react'
import CardBrand from '../components/products/CardBrand';
import { useBrands, useBrandsWithProducts } from '../hooks';
import Pagination from '../components/shared/Pagination';
import Loader from '../components/shared/Loader';


export const BrandsPage = () => {
    const [page,setPage]=useState(1);
    const {brandsFiltered, isLoadingFilterBrand} = useBrandsWithProducts();
    if(isLoadingFilterBrand) return <Loader />

    


  return (
    <div>
      <h1 className='text-5xl font-semibold text-center mb-12'>Marcas</h1>

    <div className='grid gap-3  '>
    {
        (!brandsFiltered) ? (
          <div className="col-span-2 flex items-center justify-center h-[500px]">

          </div>
        ):(
          <>
          <div className=" flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4 ">
                { brandsFiltered.map(brand=>(
                  <CardBrand key={brand.id_brand} name_brand={brand.name_brand} img={brand.images?.[0] || ''}  description={brand.description} id_brand={brand.id_brand}/>
                )) }
            </div>
            <Pagination totalItems={brandsFiltered?.length | 0} page={page} setPage={setPage}  />
          </div>
          
          </>
        )
      
      }

    </div>
    </div>
  )
}


