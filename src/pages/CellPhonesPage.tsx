import React, { useEffect, useState } from 'react'
import { prepareProducts } from '../helpers';
import CardProduct from '../components/products/CardProduct';
import ContainerFilter from '../components/products/ContainerFilter';
import { useProducts, useBrands, useCategories, useFilteredProducts } from '../hooks';
import Pagination from '../components/shared/Pagination';
import { useSearchParams } from 'react-router-dom';

const CellPhonesPage = () => {
  const [searchParams] = useSearchParams();
  const [page,setPage]=useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {brands, isLoadingBrands} = useBrands();
  const {categories, isLoadingCategories} = useCategories();
  const {data:products=[], isLoading, totalProducts}= useFilteredProducts({page, brands:selectedBrands, categories:selectedCategories});
      // const {categories, isLoadingCategories} = useCategories();
  useEffect(() => {
  const marcasDesdeURL = searchParams.getAll('brand'); // Obtiene ['Samsung']
  const categoriasDesdeURL =searchParams.getAll('category');
  
  // Guardamos las marcas de la URL en el estado (siempre como array de strings)
  setSelectedBrands(marcasDesdeURL);
  setSelectedCategories(categoriasDesdeURL);
}, [searchParams]);
  

  const preparedProducts = prepareProducts(products);
  
  return <>
    <h1 className='text-5xl font-semibold text-center mb-12'>Celulares</h1>

    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      
      {
        (isLoading || isLoadingBrands || isLoadingCategories  || !categories || !brands) ? (
          <div className="col-span-2 flex items-center justify-center h-[500px]">

          </div>
        ):(
          <>
          <ContainerFilter brands={brands} setSelectedBrands={setSelectedBrands} selectedBrands={selectedBrands} selectedCategories={selectedCategories} categories={categories} setSelectedCategories={setSelectedCategories}/>
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
