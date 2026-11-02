import type { Response, Request } from "express";
import { query } from "../config/bd.js";

// Encontrar todas las compras
export async function getPurchases(req: Request, res: Response) {
  try {
    const { rows } = await query("SELECT * FROM compra ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener las compras",
    });
  }
}

// Encontrar compra por id
export async function getPurchaseById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rows } = await query("SELECT * FROM compra WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener la compra",
    });
  }
}

// Crear compra
export async function createPurchase(req: Request, res: Response) {
  try {
    const { id_proveedor, fecha_compra, total_compra } = req.body;
    const { rows } = await query(
      "INSERT INTO compra (id_proveedor, fecha_compra, total_compra) VALUES ($1, $2, $3) RETURNING *",
      [id_proveedor, fecha_compra || new Date(), total_compra]
    );
    res.status(201).json({
      mensaje: "Compra creada exitosamente",
      compra: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear la compra",
    });
  }
}

// Actualizar compra
export async function updatePurchase(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { id_proveedor, fecha_compra, total_compra } = req.body;
    const { rows } = await query(
      "UPDATE compra SET id_proveedor = $1, fecha_compra = $2, total_compra = $3 WHERE id = $4 RETURNING *",
      [id_proveedor, fecha_compra, total_compra, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Compra no encontrada para actualizar" });
    }

    res.json({
      mensaje: "Compra actualizada exitosamente",
      compra: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar la compra",
    });
  }
}

// Eliminar compra
export async function deletePurchase(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rows } = await query("DELETE FROM compra WHERE id = $1 RETURNING *", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Compra no encontrada para eliminar" });
    }

    res.json({
      mensaje: "Compra eliminada exitosamente",
      compraEliminada: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al eliminar la compra",
    });
  }
}
