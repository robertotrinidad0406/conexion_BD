import { z } from "zod";

// 1. Esquema para CREAR detalle de compra
export const createPurchaseDetailSchema = z.object({
  id_compra: z
    .number({ message: "el id_compra es obligatorio y debe ser un número" })
    .int("el id_compra debe ser un número entero")
    .positive("el id_compra debe ser mayor a cero"),
  id_producto: z
    .number({ message: "el id_producto es obligatorio y debe ser un número" })
    .int("el id_producto debe ser un número entero")
    .positive("el id_producto debe ser mayor a cero"),
  cantidad: z
    .number({ message: "la cantidad es obligatoria y debe ser un número" })
    .int("la cantidad debe ser un número entero")
    .positive("la cantidad debe ser mayor a cero"),
  precio_unitario: z
    .number({ message: "el precio_unitario es obligatorio y debe ser un número" })
    .nonnegative("el precio unitario no puede ser negativo"),
});

// 2. Esquema para ACTUALIZAR detalle
export const updatePurchaseDetailSchema = createPurchaseDetailSchema.partial();

// 3. Esquema para FILTRAR Y PAGINAR detalles (Query Params)
export const getPurchaseDetailsQuerySchema = z.object({
  id_compra: z
    .string()
    .regex(/^\d+$/, "el id_compra debe ser un número")
    .transform(Number)
    .optional(),
  id_producto: z
    .string()
    .regex(/^\d+$/, "el id_producto debe ser un número")
    .transform(Number)
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/, "la page debe ser un número")
    .transform(Number)
    .default(1),
  limit: z
    .string()
    .regex(/^\d+$/, "el límite debe ser un número")
    .transform(Number)
    .default(10),
});

export type CreatePurchaseDetailInput = z.infer<typeof createPurchaseDetailSchema>;
export type GetPurchaseDetailsQueryInput = z.infer<typeof getPurchaseDetailsQuerySchema>;
