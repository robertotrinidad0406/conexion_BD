import { query } from "../config/bd.js";

export const DetalleVentaModel = {
  async findAll() {
    const { rows } = await query("SELECT * FROM detalle_venta ORDER BY id ASC");
    return rows;
  },

  async findById(id: string | number) {
    const { rows } = await query("SELECT * FROM detalle_venta WHERE id = $1", [id]);
    return rows[0]; // Retorna el objeto o undefined
  },

  async create(id_venta: number, id_producto: number, cantidad: number, precio_unitario: number) {
    const text = `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await query(text, [id_venta, id_producto, cantidad, precio_unitario]);
    return rows[0];
  },

  async update(id: string | number, id_venta: number, id_producto: number, cantidad: number, precio_unitario: number) {
    const text = `UPDATE detalle_venta SET id_venta = $1, id_producto = $2, cantidad = $3, precio_unitario = $4 WHERE id = $5 RETURNING *`;
    const { rows } = await query(text, [id_venta, id_producto, cantidad, precio_unitario, id]);
    return rows[0];
  },

  async delete(id: string | number) {
    const { rows } = await query("DELETE FROM detalle_venta WHERE id = $1 RETURNING *", [id]);
    return rows[0];
  }
};