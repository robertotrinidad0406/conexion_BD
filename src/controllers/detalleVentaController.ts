import type { Request, Response } from "express";
import { query } from "../config/bd.js";

// Obtener todos los detalles de venta
export async function getDetallesVenta(req: Request, res: Response) {
  try {
    const { rows } = await query("SELECT * FROM detalle_venta ORDER BY id ASC");
    res.json(rows);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los detalles de venta",
      detalles: error.message,
    });
  }
}

// Obtener un detalle de venta por ID
export async function getDetalleVentaById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await query("SELECT * FROM detalle_venta WHERE id = $1", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de venta no encontrado" });
    }
    
    res.json(rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener el detalle de venta",
      detalles: error.message,
    });
  }
}

// Crear un nuevo detalle de venta
export async function createDetalleVenta(req: Request, res: Response) {
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  try {
    const text = `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [id_venta, id_producto, cantidad, precio_unitario];
    const { rows } = await query(text, values);
    
    res.status(201).json({
      mensaje: "Detalle de venta creado con éxito",
      data: rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear el detalle de venta",
      detalles: error.message,
    });
  }
}

// Actualizar un detalle de venta
export async function updateDetalleVenta(req: Request, res: Response) {
  const { id } = req.params;
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  try {
    const text = `UPDATE detalle_venta SET id_venta = $1, id_producto = $2, cantidad = $3, precio_unitario = $4 WHERE id = $5 RETURNING *`;
    const values = [id_venta, id_producto, cantidad, precio_unitario, id];
    const { rows } = await query(text, values);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de venta no encontrado para actualizar" });
    }
    
    res.json({
      mensaje: "Detalle de venta actualizado con éxito",
      data: rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar el detalle de venta",
      detalles: error.message,
    });
  }
}

// Eliminar un detalle de venta
export async function deleteDetalleVenta(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await query("DELETE FROM detalle_venta WHERE id = $1 RETURNING *", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de venta no encontrado para eliminar" });
    }
    
    res.json({
      mensaje: "Detalle de venta eliminado con éxito",
      data: rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al eliminar el detalle de venta",
      detalles: error.message,
    });
  }
}