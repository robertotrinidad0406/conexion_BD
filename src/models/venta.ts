// src/models/venta.ts
import { query } from "../config/bd.js";

export const VentaModel = {
  // Listar todas las ventas (con nombres de cliente y empleado)
  findAll: async () => {
    const { rows } = await query(
      `SELECT v.*, c.nombre AS cliente, e.nombre AS empleado
       FROM ventas v
       JOIN clientes c ON v.cliente_id = c.id
       JOIN empleados e ON v.empleado_id = e.id
       ORDER BY v.id ASC`
    );
    return rows;
  },

  // Buscar venta por ID
  findById: async (id: number | string) => {
    const { rows } = await query(
      `SELECT v.*, c.nombre AS cliente, e.nombre AS empleado
       FROM ventas v
       JOIN clientes c ON v.cliente_id = c.id
       JOIN empleados e ON v.empleado_id = e.id
       WHERE v.id = $1`, [id]
    );
    return rows[0] || null;
  },

  // Crear una nueva venta
  create: async (cliente_id: number, empleado_id: number, producto: string, cantidad: number, precio: number, fecha: any) => {
    const { rows } = await query(
      `INSERT INTO ventas (cliente_id, empleado_id, producto, cantidad, precio, fecha)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [cliente_id, empleado_id, producto, cantidad, precio, fecha || new Date()]
    );
    return rows[0];
  },

  // Actualizar una venta
  update: async (id: number | string, cliente_id: number, empleado_id: number, producto: string, cantidad: number, precio: number, fecha: any) => {
    const { rows } = await query(
      `UPDATE ventas SET cliente_id = $1, empleado_id = $2, producto = $3, cantidad = $4, precio = $5, fecha = $6
       WHERE id = $7 RETURNING *`,
      [cliente_id, empleado_id, producto, cantidad, precio, fecha, id]
    );
    return rows[0] || null;
  },

  // Eliminar una venta
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM ventas WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   