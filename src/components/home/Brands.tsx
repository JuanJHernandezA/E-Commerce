import { useMemo } from 'react';
import { useBrandsWithProducts } from '../../hooks';



const Brands = () => {
    const {brandsFiltered, isLoadingFilterBrand} = useBrandsWithProducts();

    const randomBrands = useMemo(() => {
    if (!brandsFiltered) return [];
    
    // Clonamos el array, lo desordenamos y tomamos solo 6
    return [...brandsFiltered]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [brandsFiltered]);
  return (
    <div className='flex flex-col items-center gap-3 pt-16 pb-12'>
      <h2 className="font-bold text-2xl">
        Marcas que disponemos
      </h2>
      <p className="w-2/3 text-center text-sm md:text-base">
      Tenemos lo más moderno en tecnología y los últimos modelos de celulares disponibles</p>

      <div className="grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6">
        {randomBrands?.map(brand => (
            <div key={brand.id_brand} className="flex items-center justify-center">
                <img src={brand.images?.[0]} alt={brand.name_brand} className='w-20 h-20 object-contain' />
            </div>
        ))}
      </div>
    </div>
  )
}

export default Brands
