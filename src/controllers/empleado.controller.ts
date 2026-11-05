import type { Request, Response } from "express";
import { EmpleadoModel } from "../models/empleado";
import { empleadoFilterSchema } from "../schemas/empleado.schema.js";

/*#swagger.tags = ['Employees']
  #swagger.summary = 'Listar empleados (filtros: ?search=&puesto=&page=&limit=)' */
export const getEmpleados = async (req: Request, res: Response) => {
  try {
    const filters = empleadoFilterSchema.parse(req.query);
    const result = await EmpleadoModel.findAll(filters);
    res.json(result);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Filtros inválidos", details: error.errors.map((e: any) => e.message) });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Employees']
  #swagger.summary = 'Obtener un empleado por ID' */
export const getEmpleado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const empleado = await EmpleadoModel.findById(id);
    if (!empleado) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Employees']
  #swagger.summary = 'Crear un nuevo empleado' */
export const createEmpleado = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, puesto, salario } = req.body;
    const empleado = await EmpleadoModel.create(nombre, correo, puesto, salario);
    res.status(201).json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Employees']
  #swagger.summary = 'Actualizar un empleado' */
export const updateEmpleado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { nombre, correo, puesto, salario } = req.body;
    const empleado = await EmpleadoModel.update(id, nombre, correo, puesto, salario);
    if (!empleado) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Employees']
  #swagger.summary = 'Eliminar un empleado' */
export const deleteEmpleado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const empleado = await EmpleadoModel.delete(id);
    if (!empleado) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};   