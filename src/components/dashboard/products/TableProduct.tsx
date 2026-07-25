import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useDeleteProduct, useProducts } from "../../../hooks";
import Loader from "../../shared/Loader";
import { formatDate, formatPrice } from "../../../helpers";
import Pagination from "../../shared/Pagination";
import { CellTableProduct } from "./CellTableProduct";
import type { VariantProduct } from "../../../interfaces";

const tableHeaders = [
  "",
  "Nombre",
  "Variante",
  "Precio",
  "Stock",
  "Fecha de creación",
  "",
];

export const TableProduct = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: number;
  }>({});
  const [page, setPage] = useState(1);
  const { products, isLoading, totalProducts } = useProducts({ page });

  const { mutate, isPending } = useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
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

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantIndex,
    });
  };

  if (!products || isLoading || !totalProducts || isPending) return <Loader />;

  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-3 md:p-5 bg-white">
      <h1 className="font-bold text-xl">Productos</h1>
      <p className="text-sm mt-1 mb-8 font-regular text-gary-500">
        Gestiona tus productos y mira las estadísticas de tus ventas
      </p>

      
      {/* Vista móvil: Cards */}
      <div className="flex flex-col gap-4 md:hidden mb-4">
        {products?.map((product, index) => {
          const selectedVariantIndex = selectedVariants[product.id] ?? 0;
          const selectedVariant: Partial<VariantProduct> =
            product.variants[selectedVariantIndex] ?? {};

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    product.images[0] ||
                    "https://ui.shaden.com/placeholder.svg"
                  }
                  alt="Imagen del Producto"
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 aspect-square rounded-md object-contain"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(product.created_at)}
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
                        to={`/dashboard/productos/editar/${product.slug}`}
                        className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Editar
                        <HiOutlineExternalLink size={12} />
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <select
                className="border border-gray-300 rounded-md p-1 w-full text-xs"
                onChange={(e) =>
                  handleVariantChange(product.id, Number(e.target.value))
                }
                value={selectedVariantIndex}
              >
                {product.variants.map((variant, variantIndex) => (
                  <option key={variant.id} value={variantIndex}>
                    {variant.color_name} - {variant.storage}
                  </option>
                ))}
              </select>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Precio</span>
                <span className="font-medium">
                  {formatPrice(selectedVariant?.price)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stock</span>
                <span className="font-medium">
                  {selectedVariant.stock || 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vista desktop: Tabla */}
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
            {products?.map((product, index) => {
              const selectedVariantIndex =
                selectedVariants[product.id] ?? 0;
              const selectedVariant: Partial<VariantProduct> =
                product.variants[selectedVariantIndex] ?? {};

              return (
                <tr key={index}>
                  <td className="p-4 align-middle">
                    <img
                      src={
                        product.images[0] ||
                        "https://ui.shaden.com/placeholder.svg"
                      }
                      alt="Imagen del Producto"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 aspect-square rounded-md object-contain"
                    />
                  </td>

                  <CellTableProduct content={product.name} />
                  <td className="p-4 font-medium tracking-tighter">
                    <select
                      className="border border-gray-300 rounded-md p-1 w-full"
                      onChange={(e) =>
                        handleVariantChange(
                          product.id,
                          Number(e.target.value),
                        )
                      }
                      value={selectedVariantIndex}
                    >
                      {product.variants.map((variant, variantIndex) => (
                        <option key={variant.id} value={variantIndex}>
                          {variant.color_name} - {variant.storage}
                        </option>
                      ))}
                    </select>
                  </td>

                  <CellTableProduct
                    content={formatPrice(selectedVariant?.price)}
                  />
                  <CellTableProduct
                    content={(selectedVariant.stock || 0).toString()}
                  />
                  <CellTableProduct
                    content={formatDate(product.created_at)}
                  />

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
                          to={`/dashboard/productos/editar/${product.slug}`}
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
                          onClick={() => handleDeleteProduct(product.id)}
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

      <Pagination page={page} setPage={setPage} totalItems={totalProducts} />
    </div>
  );
};
