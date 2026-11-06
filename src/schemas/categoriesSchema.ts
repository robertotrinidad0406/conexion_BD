import { z } from "zod";

export const createCategorySchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, "el nombre debe tener al menos 2 caracteres")
        .max(100, "el nombre no puede superar los 100 caracteres"),
    descripcion: z
        .string()
        .trim()
        .min(10, "la descripción debe tener al menos 10 caracteres")
});

export const updateCategorySchema = createCategorySchema.partial();

export const getCategoriesQuerySchema = z.object({
    nombre: z.string().optional(),
    page: z
        .string()
        .regex(/^\d+$/, "la page debe ser un numero")
        .transform(Number)
        .default(1),
    limit: z
        .string()
        .regex(/^\d+$/, "el limite debe ser un numero")
        .transform(Number)
        .default(10),
});

// extraer el tipo de dato para typescript desde el schema q creamos
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type GetCategoriesQueryInput = z.infer<typeof getCategoriesQuerySchema>;

/* 
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);
*/
