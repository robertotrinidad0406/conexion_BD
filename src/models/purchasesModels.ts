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
  update: async (id: number | string, id_proveedor?: number, fecha_compra?: any, total_compra?: number) => {
    const text = `
      UPDATE compra 
      SET id_proveedor = COALESCE($1, id_proveedor), 
          fecha_compra = COALESCE($2, fecha_compra), 
          total_compra = COALESCE($3, total_compra) 
      WHERE id = $4 
      RETURNING *;
    `;
    const { rows } = await query(text, [
      id_proveedor || null,
      fecha_compra || null,
      total_compra !== undefined ? total_compra : null,
      id,
    ]);
    return rows[0] || null;
  },

// Eliminar una compra
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM compra WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};