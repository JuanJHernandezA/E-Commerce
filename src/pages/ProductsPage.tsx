import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardProduct from '../components/products/CardProduct';
import ContainerFilter from '../components/products/ContainerFilter';
import Loader from '../components/shared/Loader';
import Pagination from '../components/shared/Pagination';
import { prepareProducts } from '../helpers';
import { useBrandsWithProducts, useCategoriesWithProducts, useFilteredProducts } from '../hooks';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const { brandsFiltered, isLoadingFilterBrand } = useBrandsWithProducts();
  const { categoriesFiltered, isLoadingFilterCategory } = useCategoriesWithProducts();
  const { data: products = [], isLoading, totalProducts } = useFilteredProducts({
    page,
    brands: selectedBrands,
    categories: selectedCategories
  });

  useEffect(() => {
    const marcasDesdeURL = searchParams.getAll('brand'); 
    const categoriasDesdeURL = searchParams.getAll('category');

    setSelectedBrands(marcasDesdeURL);
    setSelectedCategories(categoriasDesdeURL);
  }, [searchParams]);

  const preparedProducts = prepareProducts(products);

  if (isLoading || isLoadingFilterBrand || isLoadingFilterCategory || !categoriesFiltered || !brandsFiltered) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto px-3 sm:px-6 py-3 sm:py-6 flex flex-col gap-4 sm:gap-6">
      {/* Contenedor de Filtros */}
      {brandsFiltered && categoriesFiltered && (
        <div className="flex justify-end w-full">
          <ContainerFilter
            brands={brandsFiltered}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            categories={categoriesFiltered}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      )}

      {/* Grid de Productos Responsivo */}
      {preparedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[280px] sm:h-[350px] text-slate-500 px-4 text-center">
          <p className="text-base sm:text-lg font-semibold">No se encontraron resultados</p>
          <p className="text-xs sm:text-sm">Intenta cambiando los filtros elegidos.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 sm:gap-12 w-full">
          {/* 
            - Móvil extra pequeño / Móvil estándar: 2 columnas
            - Tablet (sm/md): 3 columnas
            - Laptop (lg): 4 columnas
            - Pantallas grandes (xl): 5 columnas
          */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 gap-y-6 sm:gap-y-10 w-full">
            {preparedProducts.map((product) => (
              <CardProduct
                key={product.id}
                name={product.name}
                img={product.images[0]}
                price={product.price}
                slug={product.slug}
                colors={product.colors}
                variants={product.variants}
              />
            ))}
          </div>

          <Pagination totalItems={totalProducts} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};