import { Router } from "express";
import {
    crearProveedor,
    listarProveedores,
    obtenerProveedor,
    actualizarProveedor,
    eliminarProveedor,
} from "../controllers/contollersProveedor.js";
import { validateSchema } from "../middlewares/validateProveedorSchema.js";
import {
    createProveedorSchema,
    updateProveedorSchema,
} from "../schemas/proveedorSchema.js";
const router = Router();
router.get("/", listarProveedores);
router.get("/:id", obtenerProveedor);
router.post("/", validateSchema(createProveedorSchema), crearProveedor);
router.put("/:id", validateSchema(updateProveedorSchema), actualizarProveedor);
router.delete("/:id", eliminarProveedor);
export default router;