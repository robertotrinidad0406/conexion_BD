import type { Request, Response } from "express";
import { query } from "../config/bd.js";

export async function listarProductos(req: Request, res: Response) {
    try {
        const { rows } = await query("SELECT * FROM producto ORDER BY id ASC");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los productos",
        });
    }
}

export const obtenerProductoPorId = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const text = "SELECT * FROM producto WHERE id = $1";
        const values = [id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener el producto",
        });
    }
};

export async function crearProducto(req: Request, res: Response) {
    const { nombre, descripcion, precio, stock_actual, id_categoria } = req.body;
    try {
        const text = `INSERT INTO producto(nombre, descripcion, precio, stock_actual, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [nombre, descripcion, precio, stock_actual ?? 0, id_categoria];
        const { rows } = await query(text, values);

        res.status(201).json({
            mensaje: "producto creado con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al crear el producto",
            detalles: error.message,
        });
    }
}

export async function actualizarProducto(req: Request, res: Response) {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock_actual, id_categoria } = req.body;
    try {
        const text = `UPDATE producto SET nombre = $1, descripcion = $2, precio = $3, stock_actual = $4, id_categoria = $5 WHERE id = $6 RETURNING *`;
        const values = [nombre, descripcion, precio, stock_actual ?? 0, id_categoria, id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "producto actualizado con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al actualizar el producto",
            detalles: error.message,
        });
    }
}

export async function eliminarProductoPermanente(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const text = `DELETE FROM producto WHERE id = $1 RETURNING *`;
        const values = [id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "producto eliminado con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al eliminar el producto",
            detalles: error.message,
        });
    }
}
