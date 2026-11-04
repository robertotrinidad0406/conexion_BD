import { Router } from "express";
import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from "../controllers/cliente.controller.js";
import { validate } from "../middleware/validate.js";
import { createClienteSchema, updateClienteSchema } from "../schemas/cliente.schema.js";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getCliente);
router.post("/", validate(createClienteSchema), createCliente);
router.put("/:id", validate(updateClienteSchema), updateCliente);
router.delete("/:id", deleteCliente);

export default router;   