import type { Request, Response } from "express";
import { CustomerModel } from "../models/cliente";
import { clienteFilterSchema } from "../schemas/cliente.schema.js";

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Listar clientes (filtros: ?search=&page=&limit=)' */
export const getClientes = async (req: Request, res: Response) => {
  try {
    const filters = clienteFilterSchema.parse(req.query);
    const result = await CustomerModel.findAll(filters);
    res.json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Filtros inválidos", details: error.errors.map((e: any) => e.message) });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Obtener un cliente por ID' */
export const getCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const customer = await CustomerModel.findById(id);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Crear un nuevo cliente' */
export const createCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const customer = await CustomerModel.create(nombre, correo, telefono);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Actualizar un cliente' */
export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { nombre, correo, telefono } = req.body;
    const customer = await CustomerModel.update(id, nombre, correo, telefono);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Eliminar un cliente' */
export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const customer = await CustomerModel.delete(id);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};