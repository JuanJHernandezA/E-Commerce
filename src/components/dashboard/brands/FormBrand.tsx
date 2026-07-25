import { zodResolver } from "@hookform/resolvers/zod";
import type { JSONContent } from "@tiptap/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useBrand, useCreateBrand, useUpdateBrand } from "../../../hooks";
import {
  brandSchema,
  type BrandFormValues
} from "../../../lib/validators";
import Loader from "../../shared/Loader";
import Editor from "../formHelpers/Editor";
import InputForm from "../formHelpers/InputForm";
import SectionForm from "../formHelpers/SectionForm";
import UploaderImages from "../formHelpers/UploaderImages";

interface Props {
  titleForm: string;
}

export const FormBrand = ({ titleForm }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
  });

  const onError = (errors: any) => {
    console.log("Errores de validación que impiden el submit:", errors);
  };
  const { mutate: createBrand, isPending } = useCreateBrand();

  const { id_brand } = useParams<{ id_brand: string }>();
  const { brand, isLoading } = useBrand(Number(id_brand));
  const { mutate: updateBrand, isPending: isUpdatePending } = useUpdateBrand(
    Number(brand?.id_brand),
  );
  useEffect(() => {
    if (brand && !isLoading) {
      (setValue("name_brand", brand.name_brand),
        setValue("isActive", brand.isActive),
        setValue("description", brand.description as JSONContent),
        setValue("images", brand.images));
    }
  }, [brand, isLoading, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (id_brand) {
      updateBrand({
        name_brand: data.name_brand,
        isActive: data.isActive || true,
        images: data.images,
        description: data.description,
      });
    } else {
      createBrand({
        name_brand: data.name_brand,
        isActive: data.isActive || true,
        images: data.images,
        description: data.description,
      });
    }
  }, onError);

  const isActiveValue = watch("isActive");
  if (isUpdatePending || isPending || isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack
              size={18}
              className="transition-all group-hover:scale-125"
            />
          </button>
          <h2 className="font-bold tracking-tight text-2l capitalize">
            {titleForm}
          </h2>
        </div>
      </div>
      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1"
        onSubmit={onSubmit}
      >
        <SectionForm
          titleSection="Detalles de la Marca"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: Apple"
            label="nombre de la marca"
            name="name_brand"
            register={register}
            errors={errors}
            required
          />
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("isActive")}
              className="sr-only peer"
              defaultChecked
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-cyan-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>

            <span
              className={`text-xs font-medium ${isActiveValue ? "text-cyan-600 dark:text-cyan-600" : "text-gray-500 dark:text-gray-400"}`}
            >
              {isActiveValue ? "Activo" : "Inactivo"}
            </span>
          </label>
        </SectionForm>

        <SectionForm titleSection="Imagenes de la Marca">
          <UploaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionForm>
        <SectionForm
          titleSection="Descripción de la Marca"
          className="col-span-full"
        >
          <Editor setValue={setValue} errors={errors} />
        </SectionForm>
        <div className="flex gap-3 absolute top-0 right-0">
          <button
            className="btn-secondary-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-primary" type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar Marca"}
          </button>
        </div>
      </form>
    </div>
  );
};
