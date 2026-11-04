import { z } from "zod";
export const createProveedorSchema = z.object({
    nombre_empresa: z
        .string()
        .trim()
        .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
        .max(100, "El nombre de la empresa no puede superar los 100 caracteres"),
    contacto_nombre: z.string().trim().max(100).nullable().optional(),
    telefono: z.string().trim().max(20).nullable().optional(),
    email: z.string().email("El formato del email no es válido").max(100).nullable().optional(),
    direccion: z.string().trim().max(100).nullable().optional(),
});
export const updateProveedorSchema = createProveedorSchema.partial();
// extraer el tipo de dato para typescript desde el schema q creamos
export type CreateProveedorInput = z.infer<typeof createProveedorSchema>;
export type UpdateProveedorInput = z.infer<typeof updateProveedorSchema>;