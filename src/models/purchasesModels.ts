import { query } from "../config/bd.js";

export const PurchaseModel = {
  // Paginación y filtros 
  async findAll(filters: {
    id_proveedor?: number | undefined;
    page: number;
    limit: number;
  }) {
    const { id_proveedor, page, limit } = filters;

    let sqlBase = "WHERE 1=1"; //truco para hacer que siempre sea verdadero
    const values: any[] = [];
    let paramIndex = 1;

    // Filtros opcionales
    if (id_proveedor) {
      sqlBase += ` AND id_proveedor = $${paramIndex}`; // por seguridad usamos $1 $2 (evitar inyeccion sql)
      values.push(id_proveedor);
      paramIndex++;
    }

    // Obtener conteo total de registros coincidentes
    const countQuery = `SELECT COUNT(*) FROM compra ${sqlBase}`; // es como decir cuantas compras existen el: id_proveedor
    const countResult = await query(countQuery, values); // envia estos valores a sqlBase
    const totalItem = parseInt(countResult.rows[0].count, 10); // convierte el resultado en numero 

    // Calcular OFFSET
    const offset = (page - 1) * limit; //(2 - 1) * 10 = 10(es como decir para ver la página 2 tengo que saltarme las primeras 10 compras)
    //    offset = (1 - 1) * 10 = 0

    // Obtener registros paginados con LIMIT y OFFSET
    const dataQuery = `
      SELECT * FROM compra 
      ${sqlBase} 
      ORDER BY id ASC 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;//LIMIT 10 resultados, OFFSET saltar los resultados anteriores

    const queryValues = [...values, limit, offset];
    const { rows } = await query(dataQuery, queryValues);

    // Retornar datos + metadata de paginación
    return {
      data: rows, // las compras traidad (10) 
      pagination: {
        totalItem, // total de compras en la BD (50)
        itemsPerPage: limit, // limite de compras por pagina (10)
        currentPage: page, // pagina actual (1)
        totalPages: Math.ceil(totalItem / limit), // total de paginas redondeando (5)
      },
    };
  },

// Metodo CRUD 

  // Buscar compra por ID
  async findById(id: number | string) {
    const { rows } = await query("SELECT * FROM compra WHERE id = $1", [id]);// es como decir dame la fila de la tabla compra cuyo id coincida con el valor $1 
    return rows[0] || null; // retorna la fila si existe, o null si no existe 
  },

  // Crear una nueva compra
  async create(id_proveedor: number, fecha_compra: any, total_compra: number) {
    const text = `
      INSERT INTO compra (id_proveedor, fecha_compra, total_compra) 
      VALUES ($1, COALESCE($2, NOW()), $3) 
      RETURNING *
    `; // Insertar una nueva compra si no tiene fecha poner ahora retorna con id nuevo
    const { rows } = await query(text, [id_proveedor, fecha_compra || null, total_compra]);
    return rows[0]; // retorna la fila creada con su id
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
    `;//el COALESCE es para que si no se envia un valor se mantenga el valor anterior 
    // solo actualiza la compra con id $4
    // retorna la fila creada con sus nuevos datos
    const { rows } = await query(text, [
      id_proveedor || null,
      fecha_compra || null,
      total_compra !== undefined ? total_compra : null,
      id,
    ]);
    return rows[0] || null;// retorna la fila actualizada o null si no existe
  },

  // Eliminar una compra
  async delete(id: number | string) {
    const text = "DELETE FROM compra WHERE id = $1 RETURNING *";// borrar la compra con id $1
    const { rows } = await query(text, [id]);
    return rows[0] || null;// retorna la compra eliminada o null si no existe
  },
};
