import type { Request, Response } from "express";
import { query } from "../config/bd.ts";
export const crearProveedor = async (req: Request, res: Response) => {
  try {
    const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
      req.body;
    if (!nombre_empresa) {
      return res
        .status(400)
        .json({ error: "El nombre de la empresa es obligatorio" });
    }
    const sql = `
      INSERT INTO proveedor (nombre_empresa, contacto_nombre, telefono, email, direccion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      nombre_empresa,
      contacto_nombre ?? null,
      telefono ?? null,
      email ?? null,
      direccion ?? null,
    ];
    const resQuery = await query(sql, values);
    res.status(201).json(resQuery.rows[0]);
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
export const listarProveedores = async (_req: Request, res: Response) => {
  try {
    const resQuery = await query(
      "SELECT * FROM proveedor ORDER BY id",
    );
    res.json(resQuery.rows);
  } catch (err) {
    console.error("Error al listar proveedores:", err);
    res.status(500).json({ error: "No se pudieron cargar los proveedores" });
  }
};
export const obtenerProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resQuery = await query("SELECT * FROM proveedor WHERE id = $1", [id]);
    if (resQuery.rows.length === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(resQuery.rows[0]);
  } catch (err) {
    console.error("Error al obtener proveedor:", err);
    res.status(500).json({ error: "Error al obtener el proveedor" });
  }
};
export const actualizarProveedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_empresa, contacto_nombre, telefono, email, direccion } =
      req.body;
    const sql = `
      UPDATE proveedor
      SET nombre_empresa = $1,
          contacto_nombre = $2,
          telefono = $3,
          email = $4,
          direccion = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      nombre_empresa,
      contacto_nombre ?? null,
      telefono ?? null,
      email ?? null,
      direccion ?? null,
      id,
    ];
    const resQuery = await query(sql, values);
    if (resQuery.rows.length === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(resQuery.rows[0]);
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
    const resQuery = await query(
      "DELETE FROM proveedor WHERE id = $1 RETURNING *",
      [id],
    );
    if (resQuery.rows.length === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json({ mensaje: "Proveedor eliminado", proveedor: resQuery.rows[0] });
  } catch (err) {
    console.error("Error al eliminar proveedor:", err);
    res.status(500).json({ error: "Error al eliminar el proveedor" });
  }
};