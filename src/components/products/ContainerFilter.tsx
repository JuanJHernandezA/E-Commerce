import React from 'react'
import type { Brand, Category } from '../../interfaces';

interface Props {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categories: Category[];
  brands: Brand[];
}

const ContainerFilter = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  categories,
  brands
}: Props) => {

  const handleBrandSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    if (!selectedBrands.includes(value)) {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const removeBrand = (brandToRemove: string) => {
    setSelectedBrands(selectedBrands.filter(b => b !== brandToRemove));
  };

  const removeCategory = (categoryToRemove: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== categoryToRemove));
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  const totalActiveFilters = selectedBrands.length + selectedCategories.length;

  return (
    <div className="w-full flex flex-col gap-2.5 items-stretch sm:items-end">
      {/* Fila de Controles (Selects + Botón Limpiar) */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Select de Marcas */}
          <div className="relative flex-1 sm:flex-initial min-w-[130px]">
            <select
              onChange={handleBrandSelect}
              value=""
              className="w-full appearance-none bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all cursor-pointer hover:border-slate-400"
            >
              <option value="" disabled>
                Marca {selectedBrands.length > 0 ? `(${selectedBrands.length})` : ''}
              </option>
              {brands.map((brand) => (
                <option key={brand.id_brand} value={brand.name_brand}>
                  {brand.name_brand} {selectedBrands.includes(brand.name_brand) ? '✓' : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Select de Categorías */}
          <div className="relative flex-1 sm:flex-initial min-w-[130px]">
            <select
              onChange={handleCategorySelect}
              value=""
              className="w-full appearance-none bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all cursor-pointer hover:border-slate-400"
            >
              <option value="" disabled>
                Categoría {selectedCategories.length > 0 ? `(${selectedCategories.length})` : ''}
              </option>
              {categories.map((category) => (
                <option key={category.id_category} value={category.name_category}>
                  {category.name_category} {selectedCategories.includes(category.name_category) ? '✓' : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Botón de Limpiar Todo */}
        {totalActiveFilters > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-semibold  hover:underline cursor-pointer whitespace-nowrap ml-auto sm:ml-0"
          >
            Limpiar ({totalActiveFilters})
          </button>
        )}
      </div>

      {/* Badges / Chips de Filtros Activos */}
      {totalActiveFilters > 0 && (
        <div className=" flex-wrap hidden md:flex items-center justify-start sm:justify-end gap-1.5 pt-1 w-full">
          <span className="text-[11px] font-medium text-slate-400 mr-1">Filtros:</span>

          {selectedBrands.map((brand) => (
            <span
              key={`badge-brand-${brand}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white"
            >
              <span>{brand}</span>
              <button
                type="button"
                onClick={() => removeBrand(brand)}
                className="hover:bg-slate-700 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}

          {selectedCategories.map((category) => (
            <span
              key={`badge-cat-${category}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-white"
            >
              <span>{category}</span>
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="hover:bg-slate-600 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContainerFilter;