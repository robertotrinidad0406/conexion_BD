import type { Request, Response } from "express";
import {
  actualizarProveedorModel,
  crearProveedorModel,
  eliminarProveedorModel,
  listarProveedoresModel,
  obtenerProveedorModel,
} from "../models/proveedorModel.js";
import { getProveedoresQuerySchema } from "../schemas/proveedorSchema.js";
export const crearProveedor = async (req: Request, res: Response) => {
  try {
    const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
      req.body;
    if (!nombre_empresa) {
      return res
        .status(400)
        .json({ error: "El nombre de la empresa es obligatorio" });
    }
    const proveedor = await crearProveedorModel({
      nombre_empresa,
      contacto_nombre,
      telefono,
      email,
      direccion,
    });
    res.status(201).json(proveedor);
  } catch (err: any) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "Ya existe un proveedor con ese email" });
    }
    console.error("Error al crear proveedor:", err);
    res.status(500).json({ error: "Error al crear el proveedor" });
  }
};
export const listarProveedores = async (req: Request, res: Response) => {
  const parsedQuery = getProveedoresQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      status: "error",
      message: "Error de validación en los parámetros enviados",
      errors: parsedQuery.error.flatten().fieldErrors,
    });
  }
  const { page, limit, nombre_empresa, email } = parsedQuery.data;
  if (!Number.isSafeInteger((page - 1) * limit)) {
    return res.status(400).json({
      error: "La combinación de page y limit excede el rango permitido",
    });
  }
  try {
    const proveedores = await listarProveedoresModel({
      nombre_empresa,
      email,
      page,
      limit,
    });
    res.json(proveedores);
  } catch (err) {
    console.error("Error al listar proveedores:", err);
    res.status(500).json({ error: "No se pudieron cargar los proveedores" });
  }
};
export const obtenerProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    const proveedor = await obtenerProveedorModel(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (err) {
    console.error("Error al obtener proveedor:", err);
    res.status(500).json({ error: "Error al obtener el proveedor" });
  }
};
export const actualizarProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
      req.body;
    const proveedor = await actualizarProveedorModel(id, {
      nombre_empresa,
      contacto_nombre,
      telefono,
      email,
      direccion,
    });
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (err: any) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "Ya existe otro proveedor con ese email" });
    }
    console.error("Error al actualizar proveedor:", err);
    res.status(500).json({ error: "Error al actualizar el proveedor" });
  }
};
export const eliminarProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    const proveedor = await eliminarProveedorModel(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json({ mensaje: "Proveedor eliminado", proveedor });
  } catch (err) {
    console.error("Error al eliminar proveedor:", err);
    res.status(500).json({ error: "Error al eliminar el proveedor" });
  }
};