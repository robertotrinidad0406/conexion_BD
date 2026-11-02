import type { Response, Request } from "express";
import { query } from "../config/bd.js";

// Encontrar todos los detalles de compras
export async function getPurchaseDetails(req: Request, res: Response) {
  try {
    const { rows } = await query("SELECT * FROM detalle_compra ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los detalles de compras",
    });
  }
}

// Encontrar detalle de compra por id
export async function getPurchaseDetailsById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rows } = await query("SELECT * FROM detalle_compra WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de compra no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener el detalle de compra",
    });
  }
}


// Crear detalle de compra
export async function createPurchaseDetails(req: Request, res: Response) {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const { rows } = await query(
      "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_compra, id_producto, cantidad, precio_unitario]
    );
    res.status(201).json({
      mensaje: "Detalle de compra creado exitosamente",
      detalle: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear el detalle de compra",
    });
  }
}

// Actualizar detalle de compra
export async function updatePurchaseDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const { rows } = await query(
      "UPDATE detalle_compra SET id_compra = $1, id_producto = $2, cantidad = $3, precio_unitario = $4 WHERE id = $5 RETURNING *",
      [id_compra, id_producto, cantidad, precio_unitario, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de compra no encontrado para actualizar" });
    }

    res.json({
      mensaje: "Detalle de compra actualizado exitosamente",
      detalle: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar el detalle de compra",
    });
  }
}

// Eliminar detalle de compra
export async function deletePurchaseDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rows } = await query("DELETE FROM detalle_compra WHERE id = $1 RETURNING *", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Detalle de compra no encontrado para eliminar" });
    }

    res.json({
      mensaje: "Detalle de compra eliminado exitosamente",
      detalleEliminado: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al eliminar el detalle de compra",
    });
  }
}
