import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

import { formatDate } from "../../../helpers";
import { useBrands, useDeleteBrand } from "../../../hooks";
import Loader from "../../shared/Loader";
import Pagination from "../../shared/Pagination";
import { CellTableProduct } from "../products/CellTableProduct";

const tableHeaders = ["", "Nombre", "Productos", "Fecha de creación", ""];

export const TableBrand = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const { brands, isLoadingBrands, totalBrands } = useBrands({ page });
  const { mutate, isPending } = useDeleteBrand();

  const handleDeleteBrand = (id: number) => {
    mutate(id);
    setOpenMenuIndex(null);
  };

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  if (!brands || isLoadingBrands || !totalBrands || isPending)
    return <Loader />;

  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-3 md:p-5 bg-white">
      <h1 className="font-bold text-xl">Marcas</h1>
      <p className="text-sm mt-1 mb-8 font-regular text-gary-500">
        Gestiona tus marcas
      </p>

      
      <div className="flex flex-col gap-4 md:hidden mb-4">
        {brands?.map((brand, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  brand.images[0] ||
                  "https://ui.shaden.com/placeholder.svg"
                }
                alt="Imagen de la Marca"
                loading="lazy"
                decoding="async"
                className="w-14 h-14 aspect-square rounded-md object-contain"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {brand.name_brand}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(brand.created_at)}
                </p>
              </div>
              <div className="relative">
                <button
                  className="text-slate-900 cursor-pointer p-1"
                  onClick={() => handleMenuToggle(index)}
                >
                  <FaEllipsis />
                </button>
                {openMenuIndex === index && (
                  <div
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[120px]"
                    role="menu"
                  >
                    <Link
                      to={`/dashboard/marcas/editar/${brand.id_brand}`}
                      className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Editar
                      <HiOutlineExternalLink size={12} />
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDeleteBrand(brand.id_brand)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Productos</span>
              <span className="font-medium">{brand.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="relative w-full h-full hidden md:block">
        <table className="text-sm w-full caption-bottom overflow-auto">
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
            {brands?.map((brand, index) => (
              <tr key={index}>
                <td className="p-4 align-middle">
                  <img
                    src={
                      brand.images[0] ||
                      "https://ui.shaden.com/placeholder.svg"
                    }
                    alt="Imagen de la Marca"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 aspect-square rounded-md object-contain"
                  />
                </td>

                <CellTableProduct content={brand.name_brand} />
                <CellTableProduct content={brand.quantity.toString()} />
                <CellTableProduct content={formatDate(brand.created_at)} />

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
                        to={`/dashboard/marcas/editar/${brand.id_brand}`}
                        className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Editar
                        <HiOutlineExternalLink
                          size={12}
                          className="inline-block"
                        />
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDeleteBrand(brand.id_brand)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} setPage={setPage} totalItems={totalBrands} />
    </div>
  );
};
