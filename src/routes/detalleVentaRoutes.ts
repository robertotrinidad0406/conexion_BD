import { Router } from "express";
import {
  getDetallesVenta,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
} from "../controllers/detalleVentaController.js";

const router = Router();

router.get("/detalle-venta", getDetallesVenta);
router.get("/detalle-venta/:id", getDetalleVentaById);
router.post("/detalle-venta", createDetalleVenta);
router.put("/detalle-venta/:id", updateDetalleVenta);
router.delete("/detalle-venta/:id", deleteDetalleVenta);

export default router;