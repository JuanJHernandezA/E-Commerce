import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useColombiaLocations, useCreateOrder } from "../../hooks";
import { addressSchema, type AddressFormValues } from "../../lib/validators";
import { useCartStore } from "../../store/cart.store";
import { InputAddress } from "./InputAddress";
import ItemsCheckout from "./ItemsCheckout";
import { SelectAddress } from "./SelectAddress";

const FormCheckout = () => {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const selectedDepartment = watch("state");
  const { departments, cities, loadingDepartments, loadingCities } = useColombiaLocations(selectedDepartment);

  const { mutate: createOrder, isPending } = useCreateOrder();
  const cleanCart = useCartStore((state) => state.cleanCart);
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setReceipt(file);
    setPreview(URL.createObjectURL(file));

    setValue("receipt", file, {
      shouldValidate: true,
    });
  };

  const removeReceipt = () => {
    setReceipt(null);
    setPreview(null);

    setValue("receipt", undefined as never, {
      shouldValidate: true,
    });
  };

  const onSubmit = handleSubmit((data) => {
    if (!receipt) {
      return;
    }
    const orderInput = {
      address: data,
      cartItems: cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      receipt,
    };
    createOrder(orderInput, {
      onSuccess: () => {
        cleanCart();
      },
    });
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-3 h-screen items-center justify-center">
        <ImSpinner className="animate-spin h-10 w-10"></ImSpinner>
        <p className="text-sm font-medium">Estamos procesando tu pedido</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-stone-700 hover:bg-stone-100 hover:border-slate-300 transition-all cursor-pointer shrink-0"
      aria-label="Volver atrás"
    >
      <IoChevronBack size={18} />
    </button>
    <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>
  </div>
          <InputAddress
            register={register}
            errors={errors}
            name="addressLine1"
            placeholder="Dirección principal"
            required
          />
          <InputAddress
            register={register}
            errors={errors}
            name="addressLine2"
            placeholder="Dirección adicional (Opcional)"
          />
         <SelectAddress
            register={register}
            errors={errors}
            name="state"
            placeholder="Selecciona un departamento"
            options={departments}
            isLoading={loadingDepartments}
            onChange={() => setValue("city", "")}
            required
          />

          {/* Select de Ciudad dependiente */}
          <SelectAddress
            register={register}
            errors={errors}
            name="city"
            placeholder={
              !selectedDepartment
                ? "Selecciona un departamento primero"
                : "Selecciona una ciudad"
            }
            options={cities}
            isLoading={loadingCities}
            disabled={!selectedDepartment || loadingCities}
            required
          />
          <InputAddress
            register={register}
            errors={errors}
            name="postalCode"
            placeholder="Código postal (Opcional)"
          />

          <select
            className="border border-slate-200 rounded-md p-3"
            {...register("country")}
          >
            <option value="Colombia">Colombia</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Métodos de envío</p>

          <div className="flex justify-between items-center text-sm border-slate-600 bg-stone-100 py-4 rounded-md px-6">
            <span className="font-normal">Standard</span>
            <span className="font-semibold">Gratis</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6">
            <span>Depósito bancario</span>
          </div>
          <div className="bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200  rounded-es-md rounded-ee-md">
            <p>Compra a través de transferencia bancaria</p>
            <p>Nequi</p>
            <p>Razón social: TechFull</p>
            <p>Tipo de cuenta: Corriente</p>
            <p>Número de cuenta: 1233322211</p>
            <p>
              La información será compartida nuevamente una vez que se haya
              finalizado la compra
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
            <p className="text-sm font-medium mt-2">Comprobante de pago</p>
             <span
            className={"text-red-500 text-sm mt-2 mr-2 font-bold self-end"}
          >
            *
          </span>
          </div>

            {!preview ? (
              <label className="border-2 border-dashed border-slate-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
                <span className="text-sm font-medium">
                  Selecciona una imagen
                </span>

                <span className="text-xs text-slate-500">JPG, PNG o WEBP</span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleReceiptChange}
                  required
                />
              </label>
            ) : (
              <div className="border rounded-md p-4 flex flex-col gap-4">
                <img
                  src={preview}
                  alt="Comprobante"
                  className="rounded-md max-h-80 object-contain"
                />

                <button
                  type="button"
                  onClick={removeReceipt}
                  className="self-end rounded-md  px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black-100 cursor-pointer"
                >
                  Eliminar comprobante
                </button>
              </div>
            )}
            {errors.receipt && (
              <p className="text-xs text-red-500">{errors.receipt.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-semibold text-3xl">Resumen del pedido</h3>
          <ItemsCheckout />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2 cursor-pointer"
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
};

export default FormCheckout;
