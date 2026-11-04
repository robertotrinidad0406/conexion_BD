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

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;