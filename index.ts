// src/index.ts
import "dotenv/config";

import { pool } from "./src/config/bd.js";
import express from "express";
import cors from "cors";
import routersProveedores from "./src/routes/routersProveedor.js";
import detalleVentaRoutes from "./src/routes/detalleVentaRoutes.js";
import empleadoRoutes from './src/routes/empleado.routes.js';
import clienteRoutes from './src/routes/cliente.routes.js';
import ventaRoutes from './src/routes/venta.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/proveedores", routersProveedores);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/ventas', ventaRoutes);
app.use("/api", detalleVentaRoutes);

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

const shutdown = () => {
  server.close((error) => {
    if (error) {
      console.error("Error al cerrar el servidor:", error);
      process.exitCode = 1;
    }
    pool
      .end()
      .then(() => process.exit())
      .catch((poolError) => {
        console.error("Error al cerrar el pool de PostgreSQL:", poolError);
        process.exitCode = 1;
        process.exit();
      });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);   