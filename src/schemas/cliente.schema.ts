import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  correo: z
    .string()
    .email("El formato del correo no es válido")
    .max(100, "El correo no puede superar los 100 caracteres"),
  telefono: z.string().trim().max(20).nullable().optional(),
});

export const updateClienteSchema = createClienteSchema.partial();

export const clienteFilterSchema = z.object({
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
export type ClienteFilter = z.infer<typeof clienteFilterSchema>;