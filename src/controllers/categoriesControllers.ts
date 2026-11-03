import type { Request, Response } from "express";
import { query } from "../config/bd.js";

export async function listarCategorias(req: Request, res: Response) {
    try {
        const { rows } = await query("SELECT * FROM categoria ORDER BY id ASC");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener las categorías",
        });
    }
}

export const obtenerCategoriaPorId = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const text = "SELECT * FROM categoria WHERE id = $1";
        const values = [id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener la categoría",
        });
    }
};

export async function crearCategoria(req: Request, res: Response) {
    const { nombre, descripcion } = req.body;
    try {
        const text = `INSERT INTO categoria(nombre, descripcion) VALUES ($1, $2) RETURNING *`;
        const values = [nombre, descripcion];
        const { rows } = await query(text, values);

        res.status(201).json({
            mensaje: "categoría creada con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al crear la categoría",
            detalles: error.message,
        });
    }
}

export async function actualizarCategoria(req: Request, res: Response) {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;
    try {
        const text = `UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *`;
        const values = [nombre, descripcion, id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            mensaje: "categoría actualizada con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al actualizar la categoría",
            detalles: error.message,
        });
    }
}

export async function eliminarCategoriaPermanente(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const text = `DELETE FROM categoria WHERE id = $1 RETURNING *`;
        const values = [id];
        const { rows } = await query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            mensaje: "categoría eliminada con éxito",
            data: rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al eliminar la categoría",
            detalles: error.message,
        });
    }
}
