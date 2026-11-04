import { Router } from "express";
import { getVentas, getVenta, createVenta, updateVenta, deleteVenta } from "../controllers/venta.controller.js";
import { validate } from "../middleware/validate.js";
import { createVentaSchema, updateVentaSchema } from "../schemas/venta.schema.js";

const router = Router();

router.get("/", getVentas);
router.get("/:id", getVenta);
router.post("/", validate(createVentaSchema), createVenta);
router.put("/:id", validate(updateVentaSchema), updateVenta);
router.delete("/:id", deleteVenta);

export default router;