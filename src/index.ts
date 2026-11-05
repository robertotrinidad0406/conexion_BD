import "dotenv/config";
import express, { Router } from "express";
import type { Application, Request, Response } from "express";
import purchasesRoutes from "./routes/purchasesRoutes.js";
import detalleVentaRoutes from "./routes/detalleVentaRoutes.js"; // Asegúrate que el nombre de tu archivo de rutas sea este

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
router.use("/detalles-venta", detalleVentaRoutes); // Registramos la ruta aquí

// MUY IMPORTANTE: Montamos el router general bajo el prefijo "/api"
app.use("/api", router); 

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
