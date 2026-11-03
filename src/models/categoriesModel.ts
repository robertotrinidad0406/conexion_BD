import { query } from "../config/bd.js";

// Modelo para la tabla de "categoria"
export const CategoryModel = {
    async getAllCategories() {
        const { rows } = await query("SELECT * FROM categoria ORDER BY id ASC");
        return rows;
    },
    async getCategoryById(id: number | string) {
        const { rows } = await query("SELECT * FROM categoria WHERE id=$1", [id]);
        return rows[0] || null;
    },
    async insertCategory(nombre: string, descripcion: string) {
        const text =
            "INSERT INTO categoria(nombre, descripcion) VALUES($1, $2) RETURNING *";
        const { rows } = await query(text, [nombre, descripcion]);
        return rows[0];
    },
    async updateCategory(
        id: number | string,
        nombre: string,
        descripcion: string
    ) {
        const text =
            "UPDATE categoria SET nombre=$1, descripcion=$2 WHERE id=$3 RETURNING *";
        const { rows } = await query(text, [nombre, descripcion, id]);
        return rows[0] || null;
    },
    async deleteCategory(id: number | string) {
        const text = "DELETE FROM categoria WHERE id=$1 RETURNING *";
        const { rows } = await query(text, [id]);
        return rows[0] || null;
    },
};

