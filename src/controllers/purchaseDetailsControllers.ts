import type { Response, Request } from "express";
import { PurchaseDetailModel } from "../models/purchaseDetailsModels.js";
import type { GetPurchaseDetailsQueryInput } from "../schemas/purchaseDetailSchema.js";
import { getPurchaseDetailsQuerySchema } from "../schemas/purchaseDetailSchema.js";

// Listar todos los detalles de compras
export async function getPurchaseDetails(
  req: Request<{}, {}, {}, GetPurchaseDetailsQueryInput>,
  res: Response,
) {
  try {
    const result = getPurchaseDetailsQuerySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: "Parámetros de consulta inválidos",
        detalles: result.error.format(),
      });
    }

    const { id_compra, id_producto, limit, page } = result.data;
    const details = await PurchaseDetailModel.findAll({ id_compra, id_producto, limit, page });
    res.status(200).json(details);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los detalles de compra",
      detalles: error.message,
    });
  }
}

// GET /purchase_details/:id
export async function getPurchaseDetailsById(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const detail = await PurchaseDetailModel.findById(idBuscado);
    if (!detail) {
      return res.status(404).json({
        mensaje: "el detalle con ese id no existe",
      });
    }
    res.status(200).json({ ok: true, data: detail });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener el detalle",
      detalles: error.message,
    });
  }
}

// GET /purchases/:purchaseId/details (Detalles de una compra específica)
export async function getPurchaseDetailsByPurchaseId(req: Request, res: Response) {
  const purchaseId = Number(req.params.purchaseId);
  if (!purchaseId || isNaN(purchaseId)) {
    return res.status(400).json({
      mensaje: "el purchaseId debe ser un número válido",
    });
  }
  try {
    const details = await PurchaseDetailModel.findByPurchaseId(purchaseId);
    res.status(200).json(details);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los detalles de la compra",
      detalles: error.message,
    });
  }
}

// POST /purchase_details
export async function createPurchaseDetails(req: Request, res: Response) {
  const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
  try {
    const newDetail = await PurchaseDetailModel.create(id_compra, id_producto, cantidad, precio_unitario);
    res.status(201).json({
      ok: true,
      data: newDetail,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el detalle de compra",
      detalles: error.message,
    });
  }
}

// PUT /purchase_details/:id
export async function updatePurchaseDetails(req: Request, res: Response) {
  const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const detailFind = await PurchaseDetailModel.findById(idBuscado);
    if (!detailFind) {
      return res.status(404).json({
        mensaje: "el detalle con ese id no existe",
      });
    }
    const detailUpdated = await PurchaseDetailModel.update(idBuscado, id_compra, id_producto, cantidad, precio_unitario);
    res.status(200).json({
      ok: true,
      data: detailUpdated,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al actualizar el detalle",
      detalles: error.message,
    });
  }
}

// DELETE /purchase_details/:id
export async function deletePurchaseDetails(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado || isNaN(idBuscado)) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const detailFind = await PurchaseDetailModel.findById(idBuscado);
    if (!detailFind) {
      return res.status(404).json({
        mensaje: "el detalle con ese id no existe",
      });
    }
    const detailDeleted = await PurchaseDetailModel.delete(idBuscado);
    res.status(200).json({
      mensaje: "detalle eliminado con exito",
      data: detailDeleted,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al eliminar el detalle",
      detalles: error.message,
    });
  }
}
