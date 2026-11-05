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
    proveedorIdSchema,
} from "../schemas/proveedorSchema.js";
const router = Router();
router.get("/", listarProveedores);
router.get("/:id", validateSchema(proveedorIdSchema, "params"), obtenerProveedor);
router.post("/", validateSchema(createProveedorSchema), crearProveedor);
router.put(
    "/:id",
    validateSchema(proveedorIdSchema, "params"),
    validateSchema(updateProveedorSchema),
    actualizarProveedor,
);
router.delete("/:id", validateSchema(proveedorIdSchema, "params"), eliminarProveedor);
export default router;