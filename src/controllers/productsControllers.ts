import type { Request, Response } from "express";
import { ProductModel } from "../models/productsModel.js";
import { getProductsQuerySchema, type GetProductsQueryInput } from "../schemas/productsSchema.js";

export async function listarProductos(
    req: Request<{}, {}, {}, GetProductsQueryInput>,
    res: Response
) {
    try {
        const result = getProductsQuerySchema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                error: "Parámetros de consulta inválidos",
                detalles: result.error.format(),
            });
        }
        const { nombre, precio, limit, page } = result.data;
        const products = await ProductModel.getAllProducts({ nombre, precio, limit, page });
        res.status(200).json(products);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los productos",
            detalles: error.message,
        });
    }
}

export const obtenerProductoPorId = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const product = await ProductModel.getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }
        res.status(200).json(product);
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
        const newProduct = await ProductModel.createProduct(
            nombre,
            descripcion,
            precio,
            stock_actual,
            id_categoria
        );

        res.status(201).json({
            mensaje: "producto creado con éxito",
            data: newProduct,
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
    const id = Number(req.params.id);
    const { nombre, descripcion, precio, stock_actual, id_categoria } = req.body;
    try {
        const updatedProduct = await ProductModel.updateProduct(
            id,
            nombre,
            descripcion,
            precio,
            stock_actual,
            id_categoria
        );

        if (!updatedProduct) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "producto actualizado con éxito",
            data: updatedProduct,
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
    const id = req.params.id as string;
    try {
        const deletedProduct = await ProductModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({
                error: "Producto no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "producto eliminado con éxito",
            data: deletedProduct,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            mensaje: "error al eliminar el producto",
            detalles: error.message,
        });
    }
}
