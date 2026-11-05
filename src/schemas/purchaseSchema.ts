import type { Response, Request, NextFunction } from "express";
import { z, ZodObject, ZodError } from "zod";

// ESQUEMAS DE VALIDACIÓN (ZOD)
export const createPurchaseSchema = z.object({
  id_proveedor: z
    .number({ message: "el id_proveedor es obligatorio y debe ser un número" })
    .int("el id_proveedor debe ser un número entero")
    .positive("el id_proveedor debe ser mayor a cero"),
  fecha_compra: z.string().optional(),
  total_compra: z
    .number({ message: "el total_compra es obligatorio y debe ser un número" })
    .nonnegative("el total de la compra no puede ser negativo"),
});

export const updatePurchaseSchema = createPurchaseSchema.partial();

export const getPurchasesQuerySchema = z.object({
  id_proveedor: z
    .string()
    .regex(/^\d+$/, "el id_proveedor debe ser un número")
    .transform(Number)
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "el límite debe ser un número")
    .transform(Number)
    .optional(),
});
export type GetPurchasesQueryInput = z.infer<typeof getPurchasesQuerySchema>;
export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;


//MIDDLEWARE DE VALIDACIÓN (lo puse en su lugar xd)
