import { useState } from "react";
import { IoChevronBack, IoCloseOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/shared/Loader";
import { formatDateLong, formatPrice } from "../../../helpers";
import { useOrderAdmin } from "../../../hooks";

const tableHeaders = ["Producto", "Cantidad", "Total"];
export const DashboardOrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrderAdmin(Number(id));

  const [isImageOpen, setIsImageOpen] = useState(false);

  if (isLoading || !order) return <Loader />;
  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="border cursor-pointer rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-stone-100 transition-all"
          onClick={() => navigate(-1)}
        >
          <IoChevronBack size={16} />
          Volver
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-bold">Pedido #{id}</h1>
          <p className="text-sm">{formatDateLong(order.created_at)}</p>
        </div>
        <div />
        <div />
      </div>
      <div className="flex flex-col mt-10 mb-5 gap-10">
        <table className="text-sm w-full caption-bottom overflo-auto">
          <thead className="border-b gorder-gray-200 pb-3">
            <tr className="text-sm font-bold">
              {tableHeaders.map((header, index) => (
                <th className="h-12 px-4 text-left" key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {order.orderItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 font-medium traking-tighter flex gap-3 items-center">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-20 w-20 object-contain rounded-lg"
                  />

                  <div className="space-y-2">
                    <h3>{item.productName}</h3>
                    <p className="text-xs">
                      {item.color_name} / {item.storage}
                    </p>
                    <p className="text-sm">{formatPrice(item.price)}</p>
                  </div>
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {item.quantity}
                </td>
                <td className="p-4 font-medium tracking-tighter text-center">
                  {formatPrice(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-3 text-slate-600 text-sm self-end w-1/2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Envío (Standard)</p>
            <p>{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between text-black font-semibold">
            <p>Total</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Dirección</h2>
          <div className="border border-stone-300 p-5 flex flex-col gap-5">
            <div className="space-y-1">
              <h3 className="fobnt-medium">
                Cliente:
              </h3>
              <p>{order.customer.full_name}</p>
            </div>

            <div className="flex flex-col gap-1 text-sm"><h3 className="font-medium text-base">
              Envío:
              </h3>
              <p>{order.address.addressLine1}</p>
              <p>{order.address.addressLine2 && order.address.addressLine2}</p>
              <p>Ciudad: {order.address.city}</p>
              <p>Departamento: {order.address.state}</p>
              <p>{order.address.postalCode && (<>Código postal: </>)}{order.address.postalCode}</p>
              <p>País: {order.address.country}</p></div>
          </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Comprobante de pago</h2>
             <div className="border border-stone-300 p-5 flex items-center justify-center rounded-lg h-full">
            <div className="relative group cursor-pointer" onClick={() => setIsImageOpen(true)}>
              <img
                src={order.receipt_url}
                alt="Comprobante de pago"
                className="h-48 w-48 object-cover rounded-md border border-stone-200 shadow-sm transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                Clic para ampliar
              </div>
            </div>
          </div>
          </div>
        </div>
        {isImageOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm transition-all"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            {/* Botón de cerrar */}
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-stone-300 text-sm font-semibold flex items-center gap-1 bg-stone-800/80 px-3 py-1 rounded-full cursor-pointer"
            >
              Cerrar <IoCloseOutline className='-top-10' size={20}/>
            </button>
            
            <img
              src={order.receipt_url}
              alt="Comprobante de pago grande"
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Evita cerrar si hace clic dentro de la imagen
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
