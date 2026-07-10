import React, { useState } from 'react'
import { prepareProducts } from '../helpers';
import CardProduct from '../components/products/CardProduct';
import ContainerFilter from '../components/products/ContainerFilter';
import { useProducts, useBrands, useFilteredProducts } from '../hooks';
import Pagination from '../components/shared/Pagination';

const CellPhonesPage = () => {

  const [page,setPage]=useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const {brands, isLoadingBrands} = useBrands();
  const {data:products=[], isLoading, totalProducts}= useFilteredProducts({page, brands:selectedBrands});
      // const {categories, isLoadingCategories} = useCategories();
  


  const preparedProducts = prepareProducts(products);
  
  return <>
    <h1 className='text-5xl font-semibold text-center mb-12'>Celulares</h1>

    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      
      {
        (isLoading || isLoadingBrands || !brands) ? (
          <div className="col-span-2 flex items-center justify-center h-[500px]">

          </div>
        ):(
          <>
          <ContainerFilter brands={brands} setSelectedBrands={setSelectedBrands} selectedBrands={selectedBrands}/>
          <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                { preparedProducts.map(product=>(
                  <CardProduct key={product.id} name={product.name} img={product.images[0]}  price={product.price} slug={product.slug} colors={product.colors} variants={product.variants}/>
                )) }
            </div>
            <Pagination totalItems={totalProducts} page={page} setPage={setPage}  />
          </div>
          
          </>
        )
      
      }
      
    </div>
  </>
}

export default CellPhonesPage
