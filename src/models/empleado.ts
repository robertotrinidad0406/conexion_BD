import { query } from "../config/bd.js";
import type { EmpleadoFilter } from "../schemas/empleado.schema.js";

export const EmpleadoModel = {
  findAll: async (filters: EmpleadoFilter) => {
    const { search, puesto, page, limit } = filters;
    const offset = (page - 1) * limit;

    let where: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      where.push(`(nombre ILIKE $${paramIndex} OR correo ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }
    if (puesto) {
      where.push(`puesto ILIKE $${paramIndex}`);
      params.push(`%${puesto}%`);
      paramIndex++;
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const { rows } = await query(
      `SELECT * FROM employees ${whereClause} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const countResult = await query(`SELECT COUNT(*) FROM employees ${whereClause}`, params);

    return { data: rows, total: parseInt(countResult.rows[0].count), page, limit };
  },

  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM employees WHERE id = $1", [id]);
    return rows[0] || null;
  },

  create: async (nombre: string, correo: string, puesto: string, salario: number) => {
    const { rows } = await query(
      "INSERT INTO employees (nombre, correo, puesto, salario) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, correo, puesto || null, salario || null]
    );
    return rows[0];
  },

  update: async (id: number | string, nombre: string, correo: string, puesto: string, salario: number) => {
    const { rows } = await query(
      "UPDATE employees SET nombre = $1, correo = $2, puesto = $3, salario = $4 WHERE id = $5 RETURNING *",
      [nombre, correo, puesto, salario, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM employees WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};