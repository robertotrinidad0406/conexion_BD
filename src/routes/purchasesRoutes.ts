import { Router } from "express";
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchasesControllers.js";

import {
  validateSchema,
  createPurchaseSchema,
  updatePurchaseSchema,
} from "../schemas/purchaseSchema.js";

const router = Router();

router.get("/", getPurchases);
router.get("/:id", getPurchaseById);

router.post("/", validateSchema(createPurchaseSchema), createPurchase);
router.put("/:id", validateSchema(updatePurchaseSchema), updatePurchase);

router.delete("/:id", deletePurchase);

export default router;
