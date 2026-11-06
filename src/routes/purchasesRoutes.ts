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

router.get("/", getPurchases);
router.get("/:purchaseId/details", getPurchaseDetailsByPurchaseId);
router.get("/:id", getPurchaseById);
router.post("/", validateSchema(createPurchaseSchema, "body"), createPurchase);
router.put("/:id", validateSchema(updatePurchaseSchema, "body"), updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
