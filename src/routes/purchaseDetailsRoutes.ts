import { Router } from "express";
import {
  getPurchaseDetails,
  getPurchaseDetailsById,
  createPurchaseDetails,
  updatePurchaseDetails,
  deletePurchaseDetails,
} from "../controllers/purchaseDetailsControllers.js";
import { validateSchema } from "../middlewares/validateSchemaPurchase.js";
import {
  createPurchaseDetailSchema,
  updatePurchaseDetailSchema,
} from "../schemas/purchaseDetailSchema.js";

const router = Router();

// GET lista paginada -> safeParse se hace dentro del controlador (con defaults page=1, limit=10)
router.get("/", getPurchaseDetails);

// GET detalle individual por su ID
router.get("/:id", getPurchaseDetailsById);

// POST -> Valida el body
router.post("/", validateSchema(createPurchaseDetailSchema, "body"), createPurchaseDetails);

// PUT -> Valida el body parcial
router.put("/:id", validateSchema(updatePurchaseDetailSchema, "body"), updatePurchaseDetails);

// DELETE
router.delete("/:id", deletePurchaseDetails);

export default router;
