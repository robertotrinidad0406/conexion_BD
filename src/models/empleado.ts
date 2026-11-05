// src/models/empleado.ts
import { query } from "../config/bd.js";

export const EmpleadoModel = {
  // Listar todos los empleados
  findAll: async () => {
    const { rows } = await query("SELECT * FROM empleados ORDER BY id ASC");
    return rows;
  },

  // Buscar empleado por ID
  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM empleados WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // Crear un nuevo empleado
  create: async (nombre: string, email: string, puesto: string, salario: number) => {
    const { rows } = await query(
      "INSERT INTO empleados (nombre, email, puesto, salario) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, puesto || null, salario || null]
    );
    return rows[0];
  },

  // Actualizar un empleado
  update: async (id: number | string, nombre: string, email: string, puesto: string, salario: number) => {
    const { rows } = await query(
      "UPDATE empleados SET nombre = $1, email = $2, puesto = $3, salario = $4 WHERE id = $5 RETURNING *",
      [nombre, email, puesto, salario, id]
    );
    return rows[0] || null;
  },

  // Eliminar un empleado
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM empleados WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   