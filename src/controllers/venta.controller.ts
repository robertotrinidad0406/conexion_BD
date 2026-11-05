import type { Request, Response } from "express";
import { SaleModel } from "../models/venta";
import { ventaFilterSchema } from "../schemas/venta.schema.js";

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Listar ventas (filtros: ?search=&customers_id=&fecha_desde=&fecha_hasta=&page=&limit=)' */
export const getVentas = async (req: Request, res: Response) => {
  try {
    const filters = ventaFilterSchema.parse(req.query);
    const result = await SaleModel.findAll(filters);
    res.json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Filtros inválidos", details: error.errors.map((e: any) => e.message) });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Obtener una venta por ID' */
export const getVenta = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const venta = await SaleModel.findById(id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Crear una nueva venta' */
export const createVenta = async (req: Request, res: Response) => {
  try {
    const { customers_id, fecha, total } = req.body;
    const venta = await SaleModel.create(customers_id, fecha, total);
    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Actualizar una venta' */
export const updateVenta = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { customers_id, fecha, total } = req.body;
    const venta = await SaleModel.update(id, customers_id, fecha, total);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Eliminar una venta' */
export const deleteVenta = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const venta = await SaleModel.delete(id);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};