import { Router } from "express";
import {
  getDetallesVenta,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
} from "../controllers/detalleVentaController.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { 
  createDetalleVentaSchema, 
  updateDetalleVentaSchema 
} from "../schemas/detalleVentaSchema.js";

const router = Router();

router.get("/", getDetallesVenta);

router.get("/detalle-venta", getDetallesVenta);
router.get("/detalle-venta/:id", getDetalleVentaById);
router.post("/detalle-venta", validateSchema(createDetalleVentaSchema), createDetalleVenta);
router.put("/detalle-venta/:id", validateSchema(updateDetalleVentaSchema), updateDetalleVenta);
router.delete("/detalle-venta/:id", deleteDetalleVenta);

export default router;