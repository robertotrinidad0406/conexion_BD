import { query } from "../config/bd.js";

// Modelo para la tabla de "categoria"
export const CategoryModel = {
    async getAllCategories(filters: {
        nombre?: string | undefined;
        page: number;
        limit: number;
    }) {
        const { nombre, page, limit } = filters;

        let sqlBase = "WHERE 1=1";
        const values: any[] = [];
        let paramIndex = 1;

        if (nombre) {
            sqlBase += ` AND nombre LIKE $${paramIndex}`;
            values.push(`%${nombre}%`);
            paramIndex++;
        }

        const countQuery = `SELECT COUNT(*) FROM categoria ${sqlBase}`;
        const countResult = await query(countQuery, values);
        const totalItem = parseInt(countResult.rows[0].count, 10);

        const offset = (page - 1) * limit;
        let dataQuery = `SELECT * FROM categoria ${sqlBase} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
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
    async getCategoryById(id: number | string) {
        const { rows } = await query("SELECT * FROM categoria WHERE id=$1", [id]);
        return rows[0] || null;
    },
    async createCategory(nombre: string, descripcion: string) {
        const text =
            "INSERT INTO categoria(nombre, descripcion) VALUES($1, $2) RETURNING *";
        const { rows } = await query(text, [nombre, descripcion]);
        return rows[0];
    },
    async updateCategory(
        id: number,
        nombre?: string,
        descripcion?: string
    ) {
        const text =
            `UPDATE categoria
            SET
                nombre=COALESCE($1, nombre),
                descripcion=COALESCE($2, descripcion)
            WHERE id=$3
            RETURNING *`;
        const { rows } = await query(text, [
            nombre || null,
            descripcion || null,
            id,
        ]);
        return rows[0];
    },
    async deleteCategory(id: number | string) {
        const text = "DELETE FROM categoria WHERE id=$1 RETURNING *";
        const { rows } = await query(text, [id]);
        return rows[0];
    },
};
