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

// Para el PUT: hace todos los campos opcionales
export const updatePurchaseSchema = createPurchaseSchema.partial();

// Extrae el tipo TypeScript desde el schema
export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;


//MIDDLEWARE DE VALIDACIÓN 
export function validateSchema(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // z.flattenError te da una estructura limpia { formErrors, fieldErrors }
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