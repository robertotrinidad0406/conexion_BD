import type { Response, Request } from "express";
import { PurchaseModel } from "../models/purchasesModels.js";
import type { GetPurchasesQueryInput } from "../schemas/purchaseSchema.js";

// Listar todas las compras con filtro
export async function getPurchases(
  req: Request<{}, {}, {}, GetPurchasesQueryInput>, res: Response) {
  try {
    const { id_proveedor, limit } = req.query;
    const compras = await PurchaseModel.findAll({ id_proveedor, limit });
    res.status(200).json(compras);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las compras" });
  }
}

// Obtener compra por ID
export async function getPurchaseById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const compra = await PurchaseModel.findById(id);
    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    res.status(200).json(compra);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la compra" });
  }
}

// Crear compra
export async function createPurchase(req: Request, res: Response) {
  const { id_proveedor, fecha_compra, total_compra } = req.body;
  if (!id_proveedor || total_compra === undefined) {
    return res.status(400).json({ error: "id_proveedor y total_compra son obligatorios" });
  }

  try {
    const newPurchase = await PurchaseModel.create(id_proveedor, fecha_compra, total_compra);
    res.status(201).json({
      mensaje: "Compra creada exitosamente",
      compra: newPurchase,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la compra" });
  }
}

// Actualizar compra
export async function updatePurchase(req: Request, res: Response) {
  const { id } = req.params;
  const { id_proveedor, fecha_compra, total_compra } = req.body;

  try {
    const compraActualizada = await PurchaseModel.update(id, id_proveedor, fecha_compra, total_compra);
    if (!compraActualizada) {
      return res.status(404).json({ error: "Compra no encontrada para actualizar" });
    }
    res.status(200).json({
      mensaje: "Compra actualizada exitosamente",
      compra: compraActualizada,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la compra" });
  }
}

// Eliminar compra
export async function deletePurchase(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const compraEliminada = await PurchaseModel.delete(id);
    if (!compraEliminada) {
      return res.status(404).json({ error: "Compra no encontrada para eliminar" });
    }
    res.status(200).json({
      mensaje: "Compra eliminada exitosamente",
      compraEliminada,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la compra" });
  }
}