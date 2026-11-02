import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);   
import express from "express";
import pool from "./src/config/bd.js";
import detalleVentaRoutes from "./src/routes/detalleVentaRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

import empleadoRoutes from './src/routes/empleado.routes.js';
import clienteRoutes from './src/routes/cliente.routes.js';
import ventaRoutes from './src/routes/venta.routes.js';
const app = express();

app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/ventas', ventaRoutes);

// Middleware indispensable para que Express entienda JSON en el req.body
app.use(express.json());

// Registrar las rutas del detalle de venta bajo el prefijo /api
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