import { z } from "zod";
export const createProveedorSchema = z.object({
    nombre_empresa: z
        .string()
        .trim()
        .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
        .max(100, "El nombre de la empresa no puede superar los 100 caracteres"),
    contacto_nombre: z.string().trim().max(100).nullable().optional(),
    telefono: z.string().trim().max(20).nullable().optional(),
    email: z.string().trim().email("El formato del email no es válido").max(100).nullable().optional(),
    direccion: z.string().trim().max(100).nullable().optional(),
});
export const updateProveedorSchema = createProveedorSchema
    .partial()
    .refine((proveedor) => Object.keys(proveedor).length > 0, {
        message: "Debe enviar al menos un dato para actualizar",
    });
export const proveedorIdSchema = z.object({
    id: z
        .string()
        .regex(/^[1-9]\d*$/, "El ID debe ser un entero positivo")
        .refine((id) => Number.isSafeInteger(Number(id)), "El ID está fuera de rango"),
});
const positiveIntegerQuerySchema = (fieldName: string, defaultValue: number) =>
    z
        .string()
        .regex(/^[1-9]\d*$/, `El parámetro ${fieldName} debe ser un entero positivo`)
        .transform(Number)
        .refine(Number.isSafeInteger, `El parámetro ${fieldName} está fuera de rango`)
        .default(defaultValue);
export const getProveedoresQuerySchema = z.object({
    nombre_empresa: z.string().optional(),
    email: z.string().optional(),
    page: positiveIntegerQuerySchema("page", 1),
    limit: positiveIntegerQuerySchema("limit", 10),
});
export type CreateProveedorInput = z.infer<typeof createProveedorSchema>;
export type UpdateProveedorInput = z.infer<typeof updateProveedorSchema>;
export type GetProveedoresQueryInput = z.infer<typeof getProveedoresQuerySchema>;