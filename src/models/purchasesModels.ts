import { query } from "../config/bd.js";

export const PurchaseModel = {
// Listar todas las compras
  findAll: async () => {
    const { rows } = await query("SELECT * FROM compra ORDER BY id ASC");
    return rows;
  },

// Buscar compra por ID
  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM compra WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // Crear una nueva compra
  create: async (id_proveedor: number, fecha_compra: any, total_compra: number) => {
    const { rows } = await query(
      "INSERT INTO compra (id_proveedor, fecha_compra, total_compra) VALUES ($1, $2, $3) RETURNING *",
      [id_proveedor, fecha_compra || new Date(), total_compra]
    );
    return rows[0];
  },

// Actualizar una compra
  update: async (id: number | string, id_proveedor: number, fecha_compra: any, total_compra: number) => {
    const { rows } = await query(
      "UPDATE compra SET id_proveedor = $1, fecha_compra = $2, total_compra = $3 WHERE id = $4 RETURNING *",
      [id_proveedor, fecha_compra, total_compra, id]
    );
    return rows[0] || null;
  },

// Eliminar una compra
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM compra WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};