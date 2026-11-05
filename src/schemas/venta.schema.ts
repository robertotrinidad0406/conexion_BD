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

export const ventaFilterSchema = z.object({
  search: z.string().trim().max(100).optional(),
  customers_id: z.coerce.number().int().min(1).optional(),
  fecha_desde: z.coerce.date().optional(),
  fecha_hasta: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateVentaInput = z.infer<typeof createVentaSchema>;
export type UpdateVentaInput = z.infer<typeof updateVentaSchema>;
export type VentaFilter = z.infer<typeof ventaFilterSchema>;

