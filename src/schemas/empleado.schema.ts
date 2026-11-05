import { z } from "zod";

export const createEmpleadoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  correo: z
    .string()
    .email("El formato del correo no es válido")
    .max(100, "El correo no puede superar los 100 caracteres"),
  puesto: z.string().trim().max(100).nullable().optional(),
  salario: z.number().min(0, "El salario no puede ser negativo").nullable().optional(),
});

export const updateEmpleadoSchema = createEmpleadoSchema.partial();

export const empleadoFilterSchema = z.object({
  search: z.string().trim().max(100).optional(),
  puesto: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateEmpleadoInput = z.infer<typeof createEmpleadoSchema>;
export type UpdateEmpleadoInput = z.infer<typeof updateEmpleadoSchema>;
export type EmpleadoFilter = z.infer<typeof empleadoFilterSchema>;