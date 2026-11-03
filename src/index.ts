import "dotenv/config";
import express, { Router } from "express";
import type { Application, Request, Response } from "express";
import purchasesRoutes from "./routes/purchasesRoutes.js";
import purchaseDetailsRoutes from "./routes/purchaseDetailsRoutes.js";

const app: Application = express();
const router = Router();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API CON EXPRESS FUNCIONANDO",
  });
});

// Rutas de compras y detalle_compras (Jorge)
router.use("/purchases", purchasesRoutes);
router.use("/purchase_details", purchaseDetailsRoutes);

app.use(router);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
