import { query } from "../config/bd.js";

// Modelo para la tabla de "producto"
export const ProductModel = {
    async getAllProducts() {
        const { rows } = await query("SELECT * FROM producto ORDER BY id ASC");
        return rows;
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

