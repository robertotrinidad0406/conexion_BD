import { query } from "../config/bd.js";
import type { ClienteFilter } from "../schemas/cliente.schema.js";

export const CustomerModel = {
  findAll: async (filters: ClienteFilter) => {
    const { search, page, limit } = filters;
    const offset = (page - 1) * limit;

    let where: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      where.push(`(nombre ILIKE $${paramIndex} OR correo ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const { rows } = await query(
      `SELECT * FROM customers ${whereClause} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const countResult = await query(`SELECT COUNT(*) FROM customers ${whereClause}`, params);

    return { data: rows, total: parseInt(countResult.rows[0].count), page, limit };
  },

  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM customers WHERE id = $1", [id]);
    return rows[0] || null;
  },

  create: async (nombre: string, correo: string, telefono: string) => {
    const { rows } = await query(
      "INSERT INTO customers (nombre, correo, telefono) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo, telefono || null]
    );
    return rows[0];
  },

  update: async (id: number | string, nombre: string, correo: string, telefono: string) => {
    const { rows } = await query(
      "UPDATE customers SET nombre = $1, correo = $2, telefono = $3 WHERE id = $4 RETURNING *",
      [nombre, correo, telefono, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM customers WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};