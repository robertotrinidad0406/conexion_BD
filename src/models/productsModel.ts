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
    async insertProduct(
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
        id: number | string,
        nombre: string,
        descripcion: string,
        precio: number,
        stock_actual: number,
        id_categoria: number
    ) {
        const text =
            "UPDATE producto SET nombre=$1, descripcion=$2, precio=$3, stock_actual=$4, id_categoria=$5 WHERE id=$6 RETURNING *";
        const { rows } = await query(text, [
            nombre,
            descripcion,
            precio,
            stock_actual ?? 0,
            id_categoria,
            id,
        ]);
        return rows[0] || null;
    },
    async deleteProduct(id: number | string) {
        const text = "DELETE FROM producto WHERE id=$1 RETURNING *";
        const { rows } = await query(text, [id]);
        return rows[0] || null;
    },
};

