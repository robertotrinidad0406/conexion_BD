import { query } from "../config/bd.js";

export const PurchaseModel = {
  // Paginación y filtros dinámicos (Estilo Día 5 del profesor)
  async findAll(filters: {
    id_proveedor?: number | undefined;
    page: number;
    limit: number;
  }) {
    const { id_proveedor, page, limit } = filters;

    let sqlBase = "WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    // Filtros opcionales
    if (id_proveedor) {
      sqlBase += ` AND id_proveedor = $${paramIndex}`;
      values.push(id_proveedor);
      paramIndex++;
    }

    // 1. Obtener conteo total de registros coincidentes
    const countQuery = `SELECT COUNT(*) FROM compra ${sqlBase}`;
    const countResult = await query(countQuery, values);
    const totalItem = parseInt(countResult.rows[0].count, 10);

    // 2. Calcular OFFSET
    const offset = (page - 1) * limit;

    // 3. Obtener registros paginados con LIMIT y OFFSET
    const dataQuery = `
      SELECT * FROM compra 
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

  // Buscar compra por ID
  async findById(id: number | string) {
    const { rows } = await query("SELECT * FROM compra WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // Crear una nueva compra
  async create(id_proveedor: number, fecha_compra: any, total_compra: number) {
    const text = `
      INSERT INTO compra (id_proveedor, fecha_compra, total_compra) 
      VALUES ($1, COALESCE($2, NOW()), $3) 
      RETURNING *
    `;
    const { rows } = await query(text, [id_proveedor, fecha_compra || null, total_compra]);
    return rows[0];
  },

  // Actualizar una compra
  async update(id: number | string, id_proveedor?: number, fecha_compra?: any, total_compra?: number) {
    const text = `
      UPDATE compra
      SET id_proveedor = COALESCE($1, id_proveedor),
          fecha_compra = COALESCE($2, fecha_compra),
          total_compra = COALESCE($3, total_compra)
      WHERE id = $4
      RETURNING *
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
  async delete(id: number | string) {
    const text = "DELETE FROM compra WHERE id = $1 RETURNING *";
    const { rows } = await query(text, [id]);
    return rows[0] || null;
  },
};
