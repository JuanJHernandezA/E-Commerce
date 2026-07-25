import { zodResolver } from "@hookform/resolvers/zod";
import type { JSONContent } from "@tiptap/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from "../../../helpers";
import { useCreateProduct, useUpdateProduct } from "../../../hooks";
import { useProduct } from "../../../hooks/products/useProduct";
import {
  productSchema,
  type ProductFormValues
} from "../../../lib/validators";
import Loader from "../../shared/Loader";
import { SelectBrandCombobox } from "../brands/SelectedBrandComboBox";
import { SelectCategoryCombobox } from "../categories/SelectedCategoryComboBox";
import Editor from "../formHelpers/Editor";
import InputForm from "../formHelpers/InputForm";
import SectionForm from "../formHelpers/SectionForm";
import UploaderImages from "../formHelpers/UploaderImages";
import VariantsInput from "../formHelpers/VariantsInput";
import { FeaturesInput } from "./FeaturesInput";

interface Props {
  titleForm: string;
}

export const FormProduct = ({ titleForm }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onError = (errors: any) => {
    console.log("Errores de validación que impiden el submit:", errors);
  };



  const { mutate: createProduct, isPending } = useCreateProduct();
  const {slug}=useParams<{slug:string}>()
  const {product, isLoading} = useProduct(slug || '');
  const {mutate:updateProduct, isPending:isUpdatePending} = useUpdateProduct(product?.id || '');
  useEffect(()=>{
    if(product && !isLoading) {
      setValue('name',product.name),
      setValue('slug',product.slug),
      setValue('brand',product.brand),
      setValue('category',product.category),
      setValue('isActive', product.isActive),
      setValue('features', product.features.map((f:string)=>({value:f})))
      setValue('description', product.description as JSONContent),
      setValue('images',product.images),
      setValue('variants', product.variants.map(v=>({
        id:v.id,
        stock:v.stock,
        price:v.price,
        storage:v.storage,
        color:v.color,
        colorName:v.color_name
      })))
    }
  },[product,isLoading,setValue])




  const onSubmit = handleSubmit((data) => {
    const features = data.features.map((feature) => feature.value);
    if (slug) {
      updateProduct({
        name: data.name,
      brand: data.brand,
      category: data.category,
      slug: data.slug,
      isActive: data.isActive || true,
      variants: data.variants,
      images: data.images,
      description: data.description,
      features,
      })
    } else{
      createProduct({
      name: data.name,
      brand: data.brand,
      category: data.category,
      slug: data.slug,
      isActive: data.isActive || true,
      variants: data.variants,
      images: data.images,
      description: data.description,
      features,
    });
    }
  }, onError);
  const watchName = watch("name");
  useEffect(() => {
    if (!watchName) return;

    const generatedSlug = generateSlug(watchName);
    setValue("slug", generatedSlug, { shouldValidate: true });
  }, [watchName, setValue]);
  const isActiveValue = watch("isActive");
  const watchCategory = watch('category')
  const watchBrand = watch('brand')
  if(isUpdatePending || isPending || isLoading) return <Loader />
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
          titleSection="Detalles del Producto"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: iPhone 13 Pro Max"
            label="nombre"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <FeaturesInput control={control} errors={errors} />
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
        <SectionForm>
          <InputForm
            type="text"
            label="Slug"
            name="slug"
            placeholder="iphone-13-pro-max"
            register={register}
            errors={errors}
          />

          <SelectBrandCombobox
            setValue={setValue}
            errors={errors}
            name="brand"
            value={watchBrand}
            onCreateNewBrand={(searchQuery) => {
              // Aquí puedes abrir tu modal/dialog para crear una marca
              console.log(
                "Abrir modal de creación con el nombre:",
                searchQuery,
              );
            }}
          />
          <SelectCategoryCombobox
            setValue={setValue}
            errors={errors}
            name="category"
            value={watchCategory}
            onCreateNewCategory={(searchQuery) => {
              // Aquí puedes abrir tu modal/dialog para crear una marca
              console.log(
                "Abrir modal de creación con el nombre:",
                searchQuery,
              );
            }}
          />
        </SectionForm>
        <SectionForm
          titleSection="Variantes del Producto"
          className="lg:col-span-2 h-fit"
        >
          <VariantsInput
            control={control}
            errors={errors}
            register={register}
          />
        </SectionForm>
        <SectionForm titleSection="Imagenes del Producto">
          <UploaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionForm>
        <SectionForm
          titleSection="Descripción del Producto"
          className="col-span-full"
        >
          <Editor setValue={setValue} errors={errors} initialContent={product?.description as JSONContent}/>
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
            {isPending ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};
