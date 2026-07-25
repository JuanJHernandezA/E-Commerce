import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

import { formatDate } from "../../../helpers";
import { useCategories, useDeleteCategory } from "../../../hooks";
import Loader from "../../shared/Loader";
import Pagination from "../../shared/Pagination";
import { CellTableProduct } from "../products/CellTableProduct";


const tableHeaders = [
  "",
  "Nombre",
  "Productos",
  "Fecha de creación",
  "",
];

export const TableCategory = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);


  const [page, setPage] = useState(1);
  const { categories, isLoadingCategories, totalCategories } = useCategories({ page });
const {mutate,isPending} = useDeleteCategory()
  const handleDeleteCategory = (id: number) => {
    mutate(id)
    setOpenMenuIndex(null)
  };

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };



  if (!categories || isLoadingCategories || !totalCategories || isPending) return <Loader />;
  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
      <h1 className="font-bold text-xl">Categorías</h1>
      <p className="text-sm mt-1 mb-8 font-regular text-gary-500">
        Gestiona tus categorías
      </p>

      <div className="relative w-full h-full">
        <table className="text-sm w-full caption-bottom overflox-auto">
          <thead className="border-b border-gray-200 pb-3">
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} className="h-12 px-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {

              return (
                <tr key={index}>
                  <td className="p-4 align-middle sm:table-cell">
                    <img
                      src={
                        category.images[0] ||
                        "https://ui.shaden.com/placeholder.svg"
                      }
                      alt="Imagen de la Categoría"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 aspect-square rounded-md object-contain"
                    />
                  </td>
                 
                  <CellTableProduct content={category.name_category} />
                 
                  <CellTableProduct content={category.quantity.toString()} />
                  <CellTableProduct content={formatDate(category.created_at)} />

                  <td className="relative">
                    <button
                      className="text-slate-900 cursor-pointer"
                      onClick={() => handleMenuToggle(index)}
                    >
                      <FaEllipsis />
                    </button>
                    {openMenuIndex === index && (
                      <div
                        className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[120px] cursor-pointer"
                        role="menu"
                      >
                        <Link
                          to={`/dashboard/categorias/editar/${category.id_category}`}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700
hover:bg-gray-100 cursor-pointer"
                        >
                          Editar
                          <HiOutlineExternalLink
                            size={12}
                            className="inline-block "
                          />
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDeleteCategory(category.id_category)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination page={page} setPage={setPage} totalItems={totalCategories} />
    </div>
  );
};
