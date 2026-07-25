import { useEffect, useRef, useState } from "react";

import type { FieldErrors, Path, UseFormSetValue } from "react-hook-form";
import {
  IoAddCircleOutline,
  IoCheckmark,
  IoChevronDown,
  IoSearch,
} from "react-icons/io5";
import { useCategories } from "../../../hooks";
import type { Category } from "../../../interfaces";
import type {
  ProductFormValues
} from "../../../lib/validators";

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  label?: string;
  value?: number;
  name: Path<ProductFormValues>;
  onCreateNewCategory?: (searchQuery: string) => void;
}

export const SelectCategoryCombobox = ({
  setValue,
  errors,
  name,
  label = "Categoria",
  value,
  onCreateNewCategory,
}: Props) => {
  // Pedimos hasta 100 marcas para el selector
  const { categories, isLoadingCategories } = useCategories({ page: 1, limit: 100 });
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id_category: number;
    name_category: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && categories && categories.length > 0) {
      const foundCategory = categories.find((c: Category) => c.id_category === Number(value));
      if (foundCategory) {
        setSelectedCategory({
          id_category: foundCategory.id_category,
          name_category: foundCategory.name_category,
        });
      }
    }
  }, [value, categories]);

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

  const handleSelect = (category: Category) => {
    setSelectedCategory({
      id_category: category.id_category,
      name_category: category.name_category,
    });


    setValue(name, category.id_category as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setIsOpen(false);
    setQuery("");
  };

  const filteredCategories =
    query === ""
      ? categories ?? []
      : categories?.filter((category: Category) =>
          category.name_category.toLowerCase().includes(query.toLowerCase()),
        ) ?? [];

 

  const errorMessage = errors['category']?.message as string | undefined;

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
        disabled={isLoadingCategories}
        className="flex items-center justify-between border border-gray-300 rounded-lg p-2.5 bg-white text-left text-sm shadow-sm  disabled:bg-gray-100 py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none"

      >
        <span
          className={
            selectedCategory ? "text-gray-900 font-medium" : "text-gray-400"
          }
        >
          {isLoadingCategories
            ? "Cargando categorías..."
            : selectedCategory
              ? selectedCategory.name_category
              : "Selecciona una categoría"}
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
            {filteredCategories.length > 0 ? (
              filteredCategories?.map((category: Category) => (
                <li
                  key={category.id_category}
                  onClick={() => handleSelect(category)}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <span className="text-gray-800">{category.name_category}</span>
                  {selectedCategory?.id_category === category.id_category && (
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
                    onCreateNewCategory?.(query);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-gray-50 hover:bg-blue-50 border-t border-gray-100 text-blue-600 text-sm font-medium transition-colors"
                >
                  <IoAddCircleOutline size={20} />
                  <span>Crear Categoría {query && `"${query}"`}</span>
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
