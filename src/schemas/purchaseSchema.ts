import { z } from "zod";

// 1. Esquema para CREAR una compra
export const createPurchaseSchema = z.object({
  id_proveedor: z
    .number({ message: "el id_proveedor es obligatorio y debe ser un número" })
    .int("el id_proveedor debe ser un número entero")
    .positive("el id_proveedor debe ser mayor a cero"),
  fecha_compra: z.string().optional(),
  total_compra: z
    .number({ message: "el total_compra es obligatorio y debe ser un número" })
    .positive("el total de la compra debe ser mayor a cero"),
});

// 2. Esquema para ACTUALIZAR una compra (con = para ahorrar codigo)
export const updatePurchaseSchema = createPurchaseSchema.partial();

// 3. Esquema para FILTRAR Y PAGINAR (Query Params)
export const getPurchasesQuerySchema = z.object({
  id_proveedor: z
    .string() //llegan como texto a en laurl ejem: ?page=2&limit=5
    .regex(/^\d+$/, "el id_proveedor debe ser un número") //es texto pero no (solo numeros)
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

//se usa para hacer magia convierte mi Esquema en un Type de ts
export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;
export type GetPurchasesQueryInput = z.infer<typeof getPurchasesQuerySchema>;
