import type { Response, Request, NextFunction } from "express";
import { z, ZodObject, ZodError } from "zod";

// 1. ESQUEMAS DE VALIDACIÓN
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

// Para el PUT: campos opcionales
export const updatePurchaseDetailSchema = createPurchaseDetailSchema.partial();

// Extraer el tipo TypeScript
export type CreatePurchaseDetailInput = z.infer<typeof createPurchaseDetailSchema>;

// 2. MIDDLEWARE DE VALIDACIÓN (MODELO DEL PROFESOR)
export function validateSchema(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const flattened = z.flattenError(error);
        res.status(400).json({
          status: "error",
          message: "Error de validación en los datos enviados",
          errors: flattened.fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
}