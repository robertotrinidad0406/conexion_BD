import express from "express";
import type { Request, Response, Application } from "express";
import { Router } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        mensaje: "API CON EXPRESS FUNCIONANDO",
    });
});

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000")
})

