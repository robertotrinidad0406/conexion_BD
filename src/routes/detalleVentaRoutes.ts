import "dotenv/config";
import express, { Router } from "express";
import type { Application, Request, Response } from "express";
import purchasesRoutes from "./purchasesRoutes.js";
import purchaseDetailsRoutes from "./purchaseDetailsRoutes.js";
import productsRoutes from "./productsRoutes.js";
import categoriesRoutes from "./categoriesRoutes.js";
import proveedoresRoutes from "./routersProveedor.js";
const app: Application = express();
const router = Router();

const obtenerDetallesVenta = (_req: Request, res: Response) => {
  res.status(200).json({
    mensaje: "Detalles de venta obtenidos correctamente",
  });
};

const obtenerDetalleVentaPorId = (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).json({
    id,
    mensaje: `Detalle de venta ${id} obtenido correctamente`,
  });
};

export default router;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API CON EXPRESS FUNCIONANDO",
  });
});

// Rutas de la API
router.use("/purchases", purchasesRoutes);
router.use("/purchase_details", purchaseDetailsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/proveedores", proveedoresRoutes);
router.get("/", obtenerDetallesVenta);
router.get("/:id", obtenerDetalleVentaPorId);

app.use("/api", router); 

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});