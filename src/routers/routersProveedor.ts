import { Router } from "express";
import {
    crearProveedor,
    listarProveedores,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor,
} from "../controller/contollersProveedor.ts";
const router = Router();
router.get("/", listarProveedores);
router.get("/:id", obtenerProveedor);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);
export default router;