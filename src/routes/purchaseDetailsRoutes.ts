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

router.get("/", getPurchaseDetails);
router.get("/:id", getPurchaseDetailsById);

// POST -> Valida el body
router.post("/", validateSchema(createPurchaseDetailSchema, "body"), createPurchaseDetails);

// PUT -> Valida el body parcial
router.put("/:id", validateSchema(updatePurchaseDetailSchema, "body"), updatePurchaseDetails);
router.delete("/:id", deletePurchaseDetails);

export default router;
