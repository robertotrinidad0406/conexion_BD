import { query } from "../config/bd.js";

export const PurchaseDetailModel = {
// Listar todos los detalles
  findAll: async () => {
    const { rows } = await query("SELECT * FROM detalle_compra ORDER BY id ASC");
    return rows;
  },

// Buscar detalle por ID
  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM detalle_compra WHERE id = $1", [id]);
    return rows[0] || null;
  },
// Buscar todos los detalles de una compra específica
  findByPurchaseId: async (id_compra: number | string) => {
    const { rows } = await query(
      "SELECT * FROM detalle_compra WHERE id_compra = $1 ORDER BY id ASC",
      [id_compra]
    );
    return rows;
  },

// Crear un detalle de compra
  create: async (id_compra: number, id_producto: number, cantidad: number, precio_unitario: number) => {
    const { rows } = await query(
      "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_compra, id_producto, cantidad, precio_unitario]
    );
    return rows[0];
  },

// Actualizar un detalle
update: async (id: number | string, id_compra?: number, id_producto?: number, cantidad?: number, precio_unitario?: number) => {
  const text = `
    UPDATE detalle_compra 
    SET id_compra = COALESCE($1, id_compra), 
        id_producto = COALESCE($2, id_producto), 
        cantidad = COALESCE($3, cantidad), 
        precio_unitario = COALESCE($4, precio_unitario) 
    WHERE id = $5 
    RETURNING *;
  `;
  const { rows } = await query(text, [
    id_compra || null,
    id_producto || null,
    cantidad || null,
    precio_unitario !== undefined ? precio_unitario : null,
    id,
  ]);
  return rows[0] || null;
},

// Eliminar un detalle
  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM detalle_compra WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};