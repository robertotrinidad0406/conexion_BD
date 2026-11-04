import { z } from "zod";

export const createProductSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, "el nombre debe tener al menos 2 caracteres")
        .max(100, "el nombre no puede superar los 100 caracteres"),
    descripcion: z
        .string()
        .trim()
        .optional()
        .nullable(),
    precio: z.coerce
        .number()
        .min(0, "el precio debe ser mayor o igual a 0"),
    stock_actual: z
        .number()
        .int("el stock actual debe ser un número entero")
        .min(0, "el stock actual debe ser mayor o igual a 0")
        .default(0),
    id_categoria: z
        .number()
        .int("el id de la categoría debe ser un número entero")
        .positive("el id de la categoría debe ser positivo")
});

export const updateProductSchema = createProductSchema.partial();

// extraer el tipo de dato para typescript desde el schema q creamos
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

/* CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock_actual INT NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) 
        REFERENCES categoria(id) ON DELETE CASCADE
); */
