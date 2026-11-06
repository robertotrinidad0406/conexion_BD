import type { Request, Response } from "express";
import { CategoryModel } from "../models/categoriesModel.js";
import { getCategoriesQuerySchema, type GetCategoriesQueryInput } from "../schemas/categoriesSchema.js";

export async function listarCategorias(
    req: Request<{}, {}, {}, GetCategoriesQueryInput>,
    res: Response
) {
    try {
        const result = getCategoriesQuerySchema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                error: "Parámetros de consulta inválidos",
                detalles: result.error.format(),
            });
        }
        const { nombre, limit, page } = result.data;
        const categories = await CategoryModel.getAllCategories({ nombre, limit, page });
        res.status(200).json(categories);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener las categorías",
            detalles: error.message,
        });
    }
}

export const obtenerCategoriaPorId = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const category = await CategoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }
        res.status(200).json(category);
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
        const newCategory = await CategoryModel.createCategory(nombre, descripcion);

        res.status(201).json({
            mensaje: "categoría creada con éxito",
            data: newCategory,
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
    const id = Number(req.params.id);
    const { nombre, descripcion } = req.body;
    try {
        const updatedCategory = await CategoryModel.updateCategory(id, nombre, descripcion);

        if (!updatedCategory) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            mensaje: "categoría actualizada con éxito",
            data: updatedCategory,
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
    const id = req.params.id as string;
    try {
        const deletedCategory = await CategoryModel.deleteCategory(id);

        if (!deletedCategory) {
            return res.status(404).json({
                error: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            mensaje: "categoría eliminada con éxito",
            data: deletedCategory,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al eliminar la categoría",
            detalles: error.message,
        });
    }
}
