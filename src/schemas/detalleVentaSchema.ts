import { z } from "zod";

export const createDetalleVentaSchema = z.object({
  saleId: z.number({
    invalid_type_error: "el saleId debe ser un número",
  }).int("el saleId debe ser un número entero"),
  productId: z.number({
    invalid_type_error: "el productId debe ser un número",
  }).int("el productId debe ser un número entero"),
  quantity: z
    .number({ invalid_type_error: "la cantidad debe ser un número" })
    .int("la cantidad debe ser un número entero")
    .min(1, "la cantidad debe ser al menos 1"),
  unitPrice: z
    .number({ invalid_type_error: "el precio unitario debe ser un número" })
    .min(0, "el precio no puede ser negativo"),
});

export const updateDetalleVentaSchema = createDetalleVentaSchema.partial();

// Extraer los tipos para TypeScript
export type CreateDetalleVentaInput = z.infer<typeof createDetalleVentaSchema>;
export type UpdateDetalleVentaInput = z.infer<typeof updateDetalleVentaSchema>;