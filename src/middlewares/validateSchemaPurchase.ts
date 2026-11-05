import type { Response, Request, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";
import { z } from "zod";

type RequestSource = "body" | "params" | "query";

export function validateSchema(
  schema: ZodObject,
  source: RequestSource = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // z.flattenError te da la estructura limpia { formErrors, fieldErrors }
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