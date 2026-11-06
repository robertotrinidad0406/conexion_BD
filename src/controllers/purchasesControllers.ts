import type { Response, Request } from "express";
import { PurchaseModel } from "../models/purchasesModels.js";
import type { GetPurchasesQueryInput } from "../schemas/purchaseSchema.js";
import { getPurchasesQuerySchema } from "../schemas/purchaseSchema.js";

// GET /purchases (Con safeParse para paginación y defaults de Zod)
export async function getPurchases(
  req: Request<{}, {}, {}, GetPurchasesQueryInput>,
  res: Response,
) {
  try {
    const result = getPurchasesQuerySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: "Parámetros de consulta inválidos",
        detalles: result.error.format(),
      });
    }

    const { id_proveedor, limit, page } = result.data;
    const purchases = await PurchaseModel.findAll({ id_proveedor, limit, page });
    res.status(200).json(purchases);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener las compras",
      detalles: error.message,
    });
  }
}

// GET /purchases/:id
export async function getPurchaseById(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const purchase = await PurchaseModel.findById(idBuscado);
    if (!purchase) {
      return res.status(404).json({
        mensaje: "la compra con ese id no existe",
      });
    }
    res.status(200).json({ ok: true, data: purchase });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener la compra",
      detalles: error.message,
    });
  }
}

// POST /purchases
export async function createPurchase(req: Request, res: Response) {
  const { id_proveedor, fecha_compra, total_compra } = req.body;
  try {
    const newPurchase = await PurchaseModel.create(id_proveedor, fecha_compra, total_compra);
    res.status(201).json({
      ok: true,
      data: newPurchase,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear la compra",
      detalles: error.message,
    });
  }
}

// PUT /purchases/:id
export async function updatePurchase(req: Request, res: Response) {
  const { id_proveedor, fecha_compra, total_compra } = req.body;
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const purchaseFind = await PurchaseModel.findById(idBuscado);
    if (!purchaseFind) {
      return res.status(404).json({
        mensaje: "la compra con ese id no existe",
      });
    }
    const purchaseUpdated = await PurchaseModel.update(idBuscado, id_proveedor, fecha_compra, total_compra);
    res.status(200).json({
      ok: true,
      data: purchaseUpdated,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al actualizar la compra",
      detalles: error.message,
    });
  }
}

// DELETE /purchases/:id
export async function deletePurchase(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const purchaseFind = await PurchaseModel.findById(idBuscado);
    if (!purchaseFind) {
      return res.status(404).json({
        mensaje: "la compra con ese id no existe",
      });
    }
    const purchaseDeleted = await PurchaseModel.delete(idBuscado);
    res.status(200).json({
      mensaje: "compra eliminada con exito",
      data: purchaseDeleted,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al eliminar la compra",
      detalles: error.message,
    });
  }
}
