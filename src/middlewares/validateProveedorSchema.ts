import type { Response, Request, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";
import { z } from "zod";
export function validateSchema(
    schema: ZodObject,
    source: "body" | "params" = "body",
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync(req[source]);
            if (source === "body") {
                req.body = parsed;
            }
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