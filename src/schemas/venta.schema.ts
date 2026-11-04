import { z } from "zod";

export const createVentaSchema = z.object({
  customers_id: z
    .number()
    .int("El ID del cliente debe ser un entero")
    .min(1, "El ID del cliente debe ser mayor a 0"),
  fecha: z.coerce.date().nullable().optional(),
  total: z
    .number()
    .min(0, "El total no puede ser negativo"),
});

export const updateVentaSchema = createVentaSchema.partial();

export type CreateVentaInput = z.infer<typeof createVentaSchema>;
export type UpdateVentaInput = z.infer<typeof updateVentaSchema>;