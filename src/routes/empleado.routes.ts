import { Router } from "express";
import { getEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../controllers/empleado.controller.js";
import { validate } from "../middlewares/validate.CEV.js";
import { createEmpleadoSchema, updateEmpleadoSchema } from "../schemas/empleado.schema.js";

const router = Router();

router.get("/", getEmpleados);
router.get("/:id", getEmpleado);
router.post("/", validate(createEmpleadoSchema), createEmpleado);
router.put("/:id", validate(updateEmpleadoSchema), updateEmpleado);
router.delete("/:id", deleteEmpleado);

export default router;