import { useEffect, useRef, useState } from "react";

import type { FieldErrors, Path, UseFormSetValue } from "react-hook-form";
import {
  IoAddCircleOutline,
  IoCheckmark,
  IoChevronDown,
  IoSearch,
} from "react-icons/io5";
import { useBrands } from "../../../hooks";
import type { Brand } from "../../../interfaces";
import type {
  ProductFormValues,
} from "../../../lib/validators";

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  label?: string;
  value?: number;
  name: Path<ProductFormValues>;
  onCreateNewBrand?: (searchQuery: string) => void;
}

export const SelectBrandCombobox = ({
  setValue,
  errors,
  name,
  value,
  label = "Marca",
  onCreateNewBrand,
}: Props) => {
  // Pedimos hasta 100 marcas para el selector
  const { brands, isLoadingBrands } = useBrands({ page: 1, limit: 100 });
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<{
    id_brand: number;
    name_brand: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (value && brands && brands.length > 0) {
        const foundBrand = brands.find((c: Brand) => c.id_brand === Number(value));
        if (foundBrand) {
          setSelectedBrand({
            id_brand: foundBrand.id_brand,
            name_brand: foundBrand.name_brand,
          });
        }
      }
    }, [value, brands]);

  // Cerrar el desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (brand: Brand) => {
    setSelectedBrand({
      id_brand: brand.id_brand,
      name_brand: brand.name_brand,
    });

    // 💡 GUARDAR EN EL FORMULARIO:
    // Asignamos el ID (o el objeto si tu schema lo requiere) al campo 'name'
    setValue(name, brand.id_brand as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setIsOpen(false);
    setQuery("");
  };

  // Filtrado en tiempo real según name_brand
  const filteredBrands =
    query === ""
      ? brands
      : brands.filter((brand: Brand) =>
          brand.name_brand.toLowerCase().includes(query.toLowerCase()),
        );

 

  const errorMessage = errors['brand']?.message as string | undefined;

  return (
    <div className="relative w-full space-y-1" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold tracking-tight capitalize text-slate-900">
          {label}:
        </label>
      )}

      {/* Botón principal del Select */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoadingBrands}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2.5 bg-white text-left text-sm shadow-sm  disabled:bg-gray-100 py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none"

      >
        <span
          className={
            selectedBrand ? "text-gray-900 font-medium" : "text-gray-400"
          }
        >
          {isLoadingBrands
            ? "Cargando marcas..."
            : selectedBrand
              ? selectedBrand.name_brand
              : "Selecciona una marca"}
        </span>
        <IoChevronDown
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Buscador interno */}
          <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
            <IoSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar marca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
              autoFocus
              required
            />
          </div>

          {/* Lista de Opciones */}
          <ul className="max-h-56 overflow-y-auto divide-y divide-gray-50 text-sm">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand: Brand) => (
                <li
                  key={brand.id_brand}
                  onClick={() => handleSelect(brand)}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <span className="text-gray-800">{brand.name_brand}</span>
                  {selectedBrand?.id_brand === brand.id_brand && (
                    <IoCheckmark className="text-blue-600" size={18} />
                  )}
                </li>
              ))
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onCreateNewBrand?.(query);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-gray-50 hover:bg-blue-50 border-t border-gray-100 text-blue-600 text-sm font-medium transition-colors"
                >
                  <IoAddCircleOutline size={20} />
                  <span>Crear marca {query && `"${query}"`}</span>
                </button>
              </>
            )}
          </ul>

          {/* Botón para crear nueva marca */}
        </div>
      )}

      {/* Mensaje de Error de Zod */}
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
