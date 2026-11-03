import { Router } from "express";
import {
  getPurchaseDetails,
  getPurchaseDetailsById,
  createPurchaseDetails,
  updatePurchaseDetails,
  deletePurchaseDetails,
} from "../controllers/purchaseDetailsControllers.js";

const router = Router();

router.get("/", getPurchaseDetails);
router.get("/:id", getPurchaseDetailsById);
router.post("/", createPurchaseDetails);
router.put("/:id", updatePurchaseDetails);
router.delete("/:id", deletePurchaseDetails);

export default router;
