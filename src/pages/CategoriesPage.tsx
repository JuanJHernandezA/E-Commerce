import React, { useState } from 'react'
import CardCategory from '../components/products/CardCategory';
import Pagination from '../components/shared/Pagination';
import { useCategories, useCategoriesWithProducts } from '../hooks';

const CategoriesPage = () => {
  const [page,setPage]=useState(1);

       const {categoriesFiltered, isLoadingFilterCategory} = useCategoriesWithProducts();
  return (
    <div>
      <h1 className='text-5xl font-semibold text-center mb-12'>Categorías</h1>

    <div className='grid gap-3  '>
    {
        (isLoadingFilterCategory || !categoriesFiltered) ? (
          <div className="col-span-2 flex items-center justify-center h-[500px]">

          </div>
        ):(
          <>
          <div className=" flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4 ">
                { categoriesFiltered.map(category=>(
                  <CardCategory key={category.id_category} name_category={category.name_category} img={category.images?.[0] || ''}  description={category.description} id_category={category.id_category}/>
                )) }
            </div>
            <Pagination totalItems={categoriesFiltered?.length | 0} page={page} setPage={setPage}  />
          </div>
          
          </>
        )
      
      }

    </div>
    </div>
  )
}

export default CategoriesPage
