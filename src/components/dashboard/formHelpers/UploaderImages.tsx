
import React, { useEffect, useRef, useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ImagePreview {
  file?: File;
  previewUrl: string;
}

interface Props<T extends FieldValues> {
  name?: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

const UploaderImages = <T extends FieldValues>({
  name = "images" as Path<T>,
  setValue,
  errors,
  watch,
}: Props<T>) => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const imagesRef = useRef<ImagePreview[]>([]);
  
  // Guardamos las imágenes en una ref para tener acceso actualizado al limpiar memoria
  imagesRef.current = images;

  const formImages = watch(name) as unknown as (string | File)[] | undefined;

  // Sincronización cuando los datos iniciales llegan (asíncronos)
  useEffect(() => {
    if (!formImages || formImages.length === 0) return;

    // Solo cargamos si el estado local está vacío y el formulario trae imágenes
    if (images.length === 0) {
      const existingImages: ImagePreview[] = formImages.map((item) => {
        if (typeof item === "string") {
          return { previewUrl: item };
        }
        if (item instanceof File) {
          return { file: item, previewUrl: URL.createObjectURL(item) };
        }
        return { previewUrl: String(item) };
      });

      setImages(existingImages);
    }
  }, [formImages]); 
  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => {
        if (img.file && img.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    };
  }, []);

  const updateFormAndState = (newImages: ImagePreview[]) => {
    setImages(newImages);

    // Formateamos para React Hook Form (File o URL string)
    const formValues = newImages.map((img) => img.file || img.previewUrl);

    setValue(name, formValues as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      const updatedImages = [...images, ...newFiles];
      updateFormAndState(updatedImages);

      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const targetImage = images[index];

    if (targetImage.file && targetImage.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(targetImage.previewUrl);
    }

    const updatedImages = images.filter((_, i) => i !== index);
    updateFormAndState(updatedImages);
  };

  const imageErrorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-4">
      {/* Botón Personalizado de Carga */}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
          <FiUploadCloud size={28} className="mb-2 text-slate-400" />
          <p className="text-sm font-semibold">Haz clic para subir imágenes</p>
          <p className="text-xs text-slate-400">PNG, JPG, WEBP (múltiples)</p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* Galería de Previsualización */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={`${image.previewUrl}-${index}`} className="relative group">
              <div className="border border-gray-200 w-full h-24 rounded-md p-1 bg-white lg:h-28 flex items-center justify-center overflow-hidden">
                <img
                  src={image.previewUrl}
                  alt={`Preview ${index}`}
                  className="rounded-md w-full h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform z-10"
              >
                <IoIosCloseCircleOutline size={22} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje de Error de Zod / React Hook Form */}
      {imageErrorMessage && images.length === 0 && (
        <p className="text-red-500 text-xs mt-1">
          {imageErrorMessage || "Debes seleccionar al menos una imagen"}
        </p>
      )}
    </div>
  );
};

export default UploaderImages;