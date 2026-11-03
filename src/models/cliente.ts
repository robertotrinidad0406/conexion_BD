// src/models/cliente.ts
import { query } from "../config/bd.js";

export const ClienteModel = {
  // Listar todos los clientes
  findAll: async () => {
    const { rows } = await query("SELECT * FROM clientes ORDER BY id ASC");
    return rows;
  },

  // Buscar cliente por ID
  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM clientes WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // Crear un nuevo cliente
  create: async (nombre: string, email: string, telefono: string, ciudad: string) => {
    const { rows } = await query(
      "INSERT INTO clientes (nombre, email, telefono, ciudad) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, telefono || null, ciudad || null]
    );
    return rows[0];
  },

  // Actualizar un cliente
  update: async (id: number | string, nombre: string, email: string, telefono: string, ciudad: string) => {
    const { rows } = await query(
      "UPDATE clientes SET nombre = $1, email = $2, telefono = $3, ciudad = $4 WHERE id = $5 RETURNING *",
      [nombre, email, telefono, ciudad, id]
    );
    return rows[0] || null;
  },

  // Eliminar un cliente
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   