import { Router } from "express";
import {
  getDetallesVenta,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta
} from "../controllers/detalleVentaController.js";

const router = Router();

// Definición de las rutas para detalle de venta
router.get("/", getDetallesVenta);          // Obtener todos (con paginación y filtros)
router.get("/:id", getDetalleVentaById);    // Obtener uno por ID
router.post("/", createDetalleVenta);       // Crear nuevo detalle
router.put("/:id", updateDetalleVenta);     // Actualizar detalle
router.delete("/:id", deleteDetalleVenta);  // Eliminar detalle

export default router;