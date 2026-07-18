import {z} from 'zod'

export const userRegisterSchema = z.object({
  email:z.string().email('El correo electrónico no es válido'),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(
      /[@$!%*?&._\-#]/,
      "Debe contener al menos un carácter especial (@$!%*?&._-#)"
    ),
  fullName: z.string().min(3, 'El nombre completo es requerido').trim(),
  phone: z.string()
    .regex(/^\+?[0-9]{7,15}$/, "El teléfono no es válido")
    .optional()
    .or(z.literal(""))
});

export const addressSchema = z.object({
    addressLine1: z.string().min(1, 'La dirección es requerida').max(100,'La dirección no debe excer los 100 carácteres'),
    addressLine2: z.string().max(100,'La dirección no debe excer los 100 carácteres').optional(),
    receipt: z.instanceof(File, { message: "Debes subir el comprobante de pago" }),
    city:z.string().min(1,'La ciudad es requerida').max(50,'La ciudad no debe exceder los 50 carácteres'),
    state:z.string().min(1,'El departamento es requerido').max(50,'El departamento no debe exceder los 50 carácteres'),
    postalCode:z.string().max(10,'El código postal no debe excer los 10 carácteres').optional(),
    country:z.string().min(1,'El país es requerido'),
})
export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;