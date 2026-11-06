import { Router } from "express";
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchasesControllers.js";
import { getPurchaseDetailsByPurchaseId } from "../controllers/purchaseDetailsControllers.js";
import { validateSchema } from "../middlewares/validateSchemaPurchase.js";
import {
  createPurchaseSchema,
  updatePurchaseSchema,
} from "../schemas/purchaseSchema.js";

const router = Router();

// GET lista -> El safeParse se hace dentro del controlador (con defaults page=1, limit=10)
router.get("/", getPurchases);

// GET detalles de una compra específica: /purchases/:purchaseId/details
router.get("/:purchaseId/details", getPurchaseDetailsByPurchaseId);

// GET por ID
router.get("/:id", getPurchaseById);

// POST -> Valida el body con validateSchema
router.post("/", validateSchema(createPurchaseSchema, "body"), createPurchase);

// PUT -> Valida el body parcial con validateSchema
router.put("/:id", validateSchema(updatePurchaseSchema, "body"), updatePurchase);

// DELETE
router.delete("/:id", deletePurchase);

export default router;
