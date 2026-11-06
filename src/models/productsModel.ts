import { query } from "../config/bd.js";

// Modelo para la tabla de "producto"
export const ProductModel = {
    async getAllProducts(filters: {
        nombre?: string | undefined;
        precio?: number | undefined;
        page: number;
        limit: number;
    }) {
        const { nombre, precio, page, limit } = filters;

        let sqlBase = "WHERE 1=1";
        const values: any[] = [];
        let paramIndex = 1;

        if (nombre) {
            sqlBase += ` AND nombre LIKE $${paramIndex}`;
            values.push(`%${nombre}%`);
            paramIndex++;
        }
        if (precio !== undefined) {
            sqlBase += ` AND precio <= $${paramIndex}`;
            values.push(precio);
            paramIndex++;
        }

        const countQuery = `SELECT COUNT(*) FROM producto ${sqlBase}`;
        const countResult = await query(countQuery, values);
        const totalItem = parseInt(countResult.rows[0].count, 10);

        const offset = (page - 1) * limit;
        let dataQuery = `SELECT * FROM producto ${sqlBase} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        const queryValues = [...values, limit, offset];
        const { rows } = await query(dataQuery, queryValues);
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
    async getProductById(id: number | string) {
        const { rows } = await query("SELECT * FROM producto WHERE id=$1", [id]);
        return rows[0] || null;
    },
    async createProduct(
        nombre: string,
        descripcion: string,
        precio: number,
        stock_actual: number,
        id_categoria: number
    ) {
        const text =
            "INSERT INTO producto(nombre, descripcion, precio, stock_actual, id_categoria) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const { rows } = await query(text, [
            nombre,
            descripcion,
            precio,
            stock_actual ?? 0,
            id_categoria,
        ]);
        return rows[0];
    },
    async updateProduct(
        id: number,
        nombre?: string,
        descripcion?: string,
        precio?: number,
        stock_actual?: number,
        id_categoria?: number
    ) {
        const text =
            `UPDATE producto
            SET
                nombre=COALESCE($1, nombre),
                descripcion=COALESCE($2, descripcion),
                precio=COALESCE($3, precio),
                stock_actual=COALESCE($4, stock_actual),
                id_categoria=COALESCE($5, id_categoria)
            WHERE id=$6
            RETURNING *`;
        const { rows } = await query(text, [
            nombre || null,
            descripcion || null,
            precio || null,
            stock_actual || null,
            id_categoria || null,
            id,
        ]);
        return rows[0];
    },
    async deleteProduct(id: number | string) {
        const text = "DELETE FROM producto WHERE id=$1 RETURNING *";
        const { rows } = await query(text, [id]);
        return rows[0];
    },
};
