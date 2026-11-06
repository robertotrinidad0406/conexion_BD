import "dotenv/config";
import express, { Router } from "express";
import type { Application, Request, Response } from "express";
import purchasesRoutes from "./routes/purchasesRoutes.js";
import purchaseDetailsRoutes from "./routes/purchaseDetailsRoutes.js";
import productsRoutes from './routes/productsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import proveedoresRoutes from "./routes/routersProveedor.js";
import clienteRouter from "./routes/cliente.routes.js";
import empleadoRouter from "./routes/empleado.routes.js";
import ventaRouter from "./routes/venta.routes.js";

const app: Application = express();
const router = Router();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API CON EXPRESS FUNCIONANDO",
  });
});

// Rutas de compras y detalles de venta
router.use("/purchases", purchasesRoutes);
router.use("/purchase_details", purchaseDetailsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/proveedores", proveedoresRoutes);
router.use("/clientes", clienteRouter);
router.use("/empleados", empleadoRouter);
router.use("/ventas", ventaRouter);

// MUY IMPORTANTE: Montamos el router general bajo el prefijo "/api"
app.use("/api", router); 

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
