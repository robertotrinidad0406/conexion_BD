import { query } from "../config/bd.js";

export const PurchaseDetailModel = {
  // Paginación y filtros dinámicos (Estilo Día 5 del profesor)
  async findAll(filters: {
    id_compra?: number | undefined;
    id_producto?: number | undefined;
    page: number;
    limit: number;
  }) {
    const { id_compra, id_producto, page, limit } = filters;

    let sqlBase = "WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    if (id_compra) {
      sqlBase += ` AND id_compra = $${paramIndex}`;
      values.push(id_compra);
      paramIndex++;
    }

    if (id_producto) {
      sqlBase += ` AND id_producto = $${paramIndex}`;
      values.push(id_producto);
      paramIndex++;
    }

    // 1. Obtener conteo total de registros
    const countQuery = `SELECT COUNT(*) FROM detalle_compra ${sqlBase}`;
    const countResult = await query(countQuery, values);
    const totalItem = parseInt(countResult.rows[0].count, 10);

    // 2. Calcular OFFSET
    const offset = (page - 1) * limit;

    // 3. Obtener registros paginados con LIMIT y OFFSET
    const dataQuery = `
      SELECT * FROM detalle_compra 
      ${sqlBase} 
      ORDER BY id ASC 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    const queryValues = [...values, limit, offset];
    const { rows } = await query(dataQuery, queryValues);

    // 4. Retornar datos + metadata de paginación
    return {
      data: rows,
      pagination: {
        totalItem,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalItem / limit),
      },
    };
  },

  // Buscar detalle por ID
  async findById(id: number | string) {
    const { rows } = await query("SELECT * FROM detalle_compra WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // Buscar todos los detalles de una compra específica
  async findByPurchaseId(id_compra: number | string) {
    const { rows } = await query(
      "SELECT * FROM detalle_compra WHERE id_compra = $1 ORDER BY id ASC",
      [id_compra]
    );
    return rows;
  },

  // Crear un detalle de compra
  async create(id_compra: number, id_producto: number, cantidad: number, precio_unitario: number) {
    const text = `
      INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const { rows } = await query(text, [id_compra, id_producto, cantidad, precio_unitario]);
    return rows[0];
  },

  // Actualizar un detalle
  async update(id: number | string, id_compra?: number, id_producto?: number, cantidad?: number, precio_unitario?: number) {
    const text = `
      UPDATE detalle_compra
      SET id_compra = COALESCE($1, id_compra),
          id_producto = COALESCE($2, id_producto),
          cantidad = COALESCE($3, cantidad),
          precio_unitario = COALESCE($4, precio_unitario)
      WHERE id = $5
      RETURNING *
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
  async delete(id: number | string) {
    const text = "DELETE FROM detalle_compra WHERE id = $1 RETURNING *";
    const { rows } = await query(text, [id]);
    return rows[0] || null;
  },
};
