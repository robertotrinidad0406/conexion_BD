import type { Response, Request } from "express";
import { PurchaseDetailModel } from "../models/purchaseDetailsModels.js";
import type { GetPurchaseDetailsQueryInput } from "../schemas/purchaseDetailSchema.js";

// Listar todos los detalles de compras con filtro
export async function getPurchaseDetails(
  req: Request<{}, {}, {}, GetPurchaseDetailsQueryInput>, res: Response) {
  try {
    const { id_compra, id_producto, limit } = req.query;
    const detalles = await PurchaseDetailModel.findAll({ id_compra, id_producto, limit });
    res.status(200).json(detalles);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los detalles de compras" });
  }
}

// Obtener detalle por ID
export async function getPurchaseDetailsById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const detalle = await PurchaseDetailModel.findById(id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle de compra no encontrado" });
    }
    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle de compra" });
  }
}

// Obtener detalles de una compra específica
export async function getPurchaseDetailsByPurchaseId(req: Request, res: Response) {
  const { id_compra } = req.params;
  try {
    const detalles = await PurchaseDetailModel.findByPurchaseId(id_compra);
    res.status(200).json(detalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los detalles de la compra" });
  }
}

// Crear detalle de compra
export async function createPurchaseDetails(req: Request, res: Response) {
  const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
  if (!id_compra || !id_producto || !cantidad || !precio_unitario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const newDetail = await PurchaseDetailModel.create(id_compra, id_producto, cantidad, precio_unitario);
    res.status(201).json({
      mensaje: "Detalle de compra creado exitosamente",
      detalle: newDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el detalle de compra" });
  }
}

// Actualizar detalle de compra
export async function updatePurchaseDetails(req: Request, res: Response) {
  const { id } = req.params;
  const { id_compra, id_producto, cantidad, precio_unitario } = req.body;

  try {
    const detalleActualizado = await PurchaseDetailModel.update(id, id_compra, id_producto, cantidad, precio_unitario);
    if (!detalleActualizado) {
      return res.status(404).json({ error: "Detalle de compra no encontrado para actualizar" });
    }
    res.status(200).json({
      mensaje: "Detalle de compra actualizado exitosamente",
      detalle: detalleActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el detalle de compra" });
  }
}

// Eliminar detalle de compra
export async function deletePurchaseDetails(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const detalleEliminado = await PurchaseDetailModel.delete(id);
    if (!detalleEliminado) {
      return res.status(404).json({ error: "Detalle de compra no encontrado para eliminar" });
    }
    res.status(200).json({
      mensaje: "Detalle de compra eliminado exitosamente",
      detalleEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el detalle de compra" });
  }
}
