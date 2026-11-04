import { Router } from "express";
import {
  getPurchaseDetails,
  getPurchaseDetailsById,
  createPurchaseDetails,
  updatePurchaseDetails,
  deletePurchaseDetails,
} from "../controllers/purchaseDetailsControllers.js";
import {
  validateSchema,
  createPurchaseDetailSchema,
  updatePurchaseDetailSchema,
} from "../schemas/purchaseDetailSchema.js";

const router = Router();

router.get("/", getPurchaseDetails);
router.get("/:id", getPurchaseDetailsById);

router.post("/", validateSchema(createPurchaseDetailSchema), createPurchaseDetails);
router.put("/:id", validateSchema(updatePurchaseDetailSchema), updatePurchaseDetails);

router.delete("/:id", deletePurchaseDetails);

export default router;