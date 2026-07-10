import React, { useState } from 'react'
import Separator from '../shared/Separator';
import type { Brand, Category } from '../../interfaces';




interface Props {
  selectedBrands : string[];
  setSelectedBrands: (brands:string[])=>void;
  selectedCategories : string[];
  setSelectedCategories: (categories:string[])=>void;
  categories: Category[];
  brands: Brand[]
}

const ContainerFilter = ({selectedBrands,setSelectedBrands, selectedCategories, setSelectedCategories, categories, brands}:Props) => {

  

  const handleBrandChange = (brand:string)=>{
    if (selectedBrands.includes(brand)){
      setSelectedBrands(selectedBrands.filter(b=>b !==brand));
    } else{
      setSelectedBrands([...selectedBrands, brand]);

    }
  }

   const handleCategoryChange = (category:string)=>{
    if (selectedCategories.includes(category)){
      setSelectedCategories(selectedCategories.filter(c=>c !==category));
    } else{
      setSelectedCategories([...selectedCategories, category]);

    }
  }
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
 
  return (
    // <div className='p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1'>
    //   <h3 className="font-semibold text-xl mb-4">
    //     Filtros
    //   </h3>
    //   <Separator />
    //   <div className="flex flex-col gap-3">
    //     <h3 className="text-lg font-medium text-black">
    //         Marcas
    //     </h3>
    //     <div className="flex flex-col gap-2">
    //         {brands.map(brand=>(
    //             <label key={brand.id_brand} className='inline-flex items-center'>
    //                 <input type='checkbox' className='text-black border-black focus:ring:black accent-black' checked={selectedBrands.includes(brand.name_brand)} onChange={()=>handleBrandChange(brand.name_brand)}/>
    //                 <span className='ml-2 text-black text-sm cursor-pointer'>{brand.name_brand}</span>
    //             </label>
    //         ))}
    //     </div>
    //   </div>
    // </div>
    <div className='p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1 bg-white'>
      <h3 className="font-semibold text-xl mb-4">
        Filtros
      </h3>
      <Separator />
      
      <div className="flex flex-col gap-3">
        {/* BOTÓN DEL MENÚ DESPLEGABLE */}
        <button 
          onClick={() => setIsOpenBrand(!isOpenBrand)}
          className="flex items-center justify-between w-full text-lg font-medium text-black py-2 focus:outline-none"
        >
          <span>
            Marcas 
            {/* Pequeño indicador de cuántas hay seleccionadas */}
            {selectedBrands.length > 0 && (
              <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                {selectedBrands.length}
              </span>
            )}
          </span>
          
          {/* Icono de flecha que rota si está abierto */}
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpenBrand ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* CONTENEDOR DESPLEGABLE CON MÁXIMO ALTO Y SCROLL */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpenBrand ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-52 pr-2 custom-scrollbar">
            {brands.map(brand => (
              <label key={brand.id_brand} className='inline-flex items-center p-1 rounded hover:bg-slate-50 cursor-pointer transition-colors'>
                <input 
                  type='checkbox' 
                  className='text-black border-slate-300 rounded focus:ring-black accent-black h-4 w-4' 
                  checked={selectedBrands.includes(brand.name_brand)} 
                  onChange={() => handleBrandChange(brand.name_brand)}
                />
                <span className='ml-2 text-slate-700 text-sm'>{brand.name_brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* BOTÓN DEL MENÚ DESPLEGABLE */}
        <button 
          onClick={() => setIsOpenCategory(!isOpenCategory)}
          className="flex items-center justify-between w-full text-lg font-medium text-black py-2 focus:outline-none"
        >
          <span>
            Categorías 
            {/* Pequeño indicador de cuántas hay seleccionadas */}
            {selectedCategories.length > 0 && (
              <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                {selectedCategories.length}
              </span>
            )}
          </span>
          
          {/* Icono de flecha que rota si está abierto */}
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpenCategory ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* CONTENEDOR DESPLEGABLE CON MÁXIMO ALTO Y SCROLL */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpenCategory ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-52 pr-2 custom-scrollbar">
            {categories.map(category => (
              <label key={category.id_category} className='inline-flex items-center p-1 rounded hover:bg-slate-50 cursor-pointer transition-colors'>
                <input 
                  type='checkbox' 
                  className='text-black border-slate-300 rounded focus:ring-black accent-black h-4 w-4' 
                  checked={selectedCategories.includes(category.name_category)} 
                  onChange={() => handleCategoryChange(category.name_category)}
                />
                <span className='ml-2 text-slate-700 text-sm'>{category.name_category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerFilter
