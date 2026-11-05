import { query } from "../config/bd.js";
import type { VentaFilter } from "../schemas/venta.schema.js";

export const SaleModel = {
  findAll: async (filters: VentaFilter) => {
    const { search, customers_id, fecha_desde, fecha_hasta, page, limit } = filters;
    const offset = (page - 1) * limit;

    let where: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      where.push(`(s.id::text ILIKE $${paramIndex} OR c.nombre ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }
    if (customers_id) {
      where.push(`s.customers_id = $${paramIndex}`);
      params.push(customers_id);
      paramIndex++;
    }
    if (fecha_desde) {
      where.push(`s.fecha >= $${paramIndex}`);
      params.push(fecha_desde);
      paramIndex++;
    }
    if (fecha_hasta) {
      where.push(`s.fecha <= $${paramIndex}`);
      params.push(fecha_hasta);
      paramIndex++;
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const { rows } = await query(
      `SELECT s.*, c.nombre AS cliente
       FROM sales s
       JOIN customers c ON s.customers_id = c.id
       ${whereClause}
       ORDER BY s.id ASC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM sales s JOIN customers c ON s.customers_id = c.id ${whereClause}`,
      params
    );

    return { data: rows, total: parseInt(countResult.rows[0].count), page, limit };
  },

  findById: async (id: number | string) => {
    const { rows } = await query(
      `SELECT s.*, c.nombre AS cliente FROM sales s JOIN customers c ON s.customers_id = c.id WHERE s.id = $1`,
      [id]
    );
    return rows[0] || null;
  },

  create: async (customers_id: number, fecha: any, total: number) => {
    const { rows } = await query(
      "INSERT INTO sales (customers_id, fecha, total) VALUES ($1, $2, $3) RETURNING *",
      [customers_id, fecha || new Date(), total]
    );
    return rows[0];
  },

  update: async (id: number | string, customers_id: number, fecha: any, total: number) => {
    const { rows } = await query(
      "UPDATE sales SET customers_id = $1, fecha = $2, total = $3 WHERE id = $4 RETURNING *",
      [customers_id, fecha, total, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM sales WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};