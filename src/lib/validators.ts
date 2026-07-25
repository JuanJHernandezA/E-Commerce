import type { JSONContent } from "@tiptap/react";
import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(
      /[@$!%*?&._\-#]/,
      "Debe contener al menos un carácter especial (@$!%*?&._-#)",
    ),
  fullName: z.string().min(3, "El nombre completo es requerido").trim(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "El teléfono no es válido")
    .optional()
    .or(z.literal("")),
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "La dirección es requerida")
    .max(100, "La dirección no debe excer los 100 carácteres"),
  addressLine2: z
    .string()
    .max(100, "La dirección no debe excer los 100 carácteres")
    .optional(),
  receipt: z.instanceof(File, {
    message: "Debes subir el comprobante de pago",
  }),
  city: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(50, "La ciudad no debe exceder los 50 carácteres"),
  state: z
    .string()
    .min(1, "El departamento es requerido")
    .max(50, "El departamento no debe exceder los 50 carácteres"),
  postalCode: z
    .string()
    .max(10, "El código postal no debe excer los 10 carácteres")
    .optional(),
  country: z.string().min(1, "El país es requerido"),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;
const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length == 0) {
    return true;
  }
  return !value.content.some(
    (node) =>
      node.type === "paragraph" &&
      node.content &&
      Array.isArray(node.content) &&
      node.content.some(
        (textNode) =>
          textNode.type === "text" &&
          textNode.text &&
          textNode.text.trim() !== "",
      ),
  );
};

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
 brand: z
    .number()
    .int("El ID de la marca debe ser un número entero")
    .positive("Debe seleccionar una marca válida"),

  // Llave foránea hacia la tabla 'categories' (id_category)
  category: z
    .number()
    .int("El ID de la categoría debe ser un número entero")
    .positive("Debe seleccionar una categoría válida"),
  slug: z
    .string()
    .min(1, "El slug del producto es obligatorio")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  features: z.array(
    z.object({
      value: z.string().min(1, "La característica no puede estar vacía"),
    }),
  ),
  description: z.custom<JSONContent>(
    (value): value is JSONContent =>
      typeof value === "object" &&
      value !== null &&
      !isContentEmpty(value as JSONContent),
    { message: "La descripción no puede estar vacía" },
  ),
  variants: z.array(
    z.object({
      id: z.string().optional(),
      stock: z.number(),
      price: z.number().min(1, "El precio debe ser mayor a 0"),
      storage: z.string().min(1, "El almacenamiento es requerido"),
      color: z
        .string()
        .regex(
          /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
          "El color debe de ser un valor válido en formato hexadecimal, RGB o HSL",
        ),
      colorName: z.string().min(1, "El nombre del color es requerido"),
    }),
  ).min(1, 'Debe haber al menos una variante'),
  images: z.array(z.any()).min(1,'Debe haber al menos una imagen'),
  isActive: z.boolean().default(true),
});

export const categorySchema = z.object({
  name_category: z.string().min(1, "El nombre de la categoría es obligatoria"),
  description: z.custom<JSONContent>(
    (value): value is JSONContent =>
      typeof value === "object" &&
      value !== null &&
      !isContentEmpty(value as JSONContent),
    { message: "La descripción no puede estar vacía" },
  ),
  images: z.array(z.any()).min(1,'Debe haber al menos una imagen'),
  isActive: z.boolean().default(true),
});
export const brandSchema = z.object({
  name_brand: z.string().min(1, "El nombre de la marca es obligatoria"),
  description: z.custom<JSONContent>(
    (value): value is JSONContent =>
      typeof value === "object" &&
      value !== null &&
      !isContentEmpty(value as JSONContent),
    { message: "La descripción no puede estar vacía" },
  ),
  images: z.array(z.any()).min(1,'Debe haber al menos una imagen'),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.input<typeof productSchema>
export type CategoryFormValues = z.input<typeof categorySchema>
export type BrandFormValues = z.input<typeof brandSchema>