import type { Request, Response } from "express";
import { DetalleVentaModel } from "../models/detalleVentaModels.js";

// Obtener todos los detalles de venta con paginación
export async function getDetallesVenta(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const { nombre } = req.query;
    
    // Pasamos limit, offset y nombre al modelo
    const rows = await DetalleVentaModel.findAll(limit, offset, nombre as string);
    
    res.json({
      page,
      limit,
      totalRegistros: rows.length,
      data: rows
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los detalles de venta", detalles: error.message });
  }
}

// Obtener un detalle de venta por ID
export async function getDetalleVentaById(req: Request, res: Response) {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "ID de detalle de venta inválido" });
  }
  try {
    const row = await DetalleVentaModel.findById(id);
    if (!row) {
      return res.status(404).json({ error: "Detalle de venta no encontrado" });
    }
    res.json(row);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle de venta", detalles: error.message });
  }
}

// Crear un nuevo detalle de venta
export async function createDetalleVenta(req: Request, res: Response) {
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  try {
    const newRow = await DetalleVentaModel.create(id_venta, id_producto, cantidad, precio_unitario);
    res.status(201).json({ mensaje: "Detalle de venta creado con éxito", data: newRow });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el detalle de venta", detalles: error.message });
  }
}

// Actualizar un detalle de venta
export async function updateDetalleVenta(req: Request, res: Response) {
  const { id } = req.params;
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "ID de detalle de venta inválido" });
  }
  try {
    const updatedRow = await DetalleVentaModel.update(id, id_venta, id_producto, cantidad, precio_unitario);
    if (!updatedRow) {
      return res.status(404).json({ error: "Detalle de venta no encontrado para actualizar" });
    }
    res.json({ mensaje: "Detalle de venta actualizado con éxito", data: updatedRow });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el detalle de venta", detalles: error.message });
  }
}

// Eliminar un detalle de venta
export async function deleteDetalleVenta(req: Request, res: Response) {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "ID de detalle de venta inválido" });
  }
  try {
    const deletedRow = await DetalleVentaModel.delete(id);
    if (!deletedRow) {
      return res.status(404).json({ error: "Detalle de venta no encontrado para eliminar" });
    }
    res.json({ mensaje: "Detalle de venta eliminado con éxito", data: deletedRow });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el detalle de venta", detalles: error.message });
  }
}