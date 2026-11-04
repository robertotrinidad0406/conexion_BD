import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(
        `sql ejecutado: ${text} duracion:${duration} filas:${res.rowCount}`,
    );
    return res;
};



/*resolvi el error de duplicado aunque deje el codigo en comentario por si pasa algo que necesite de el*/



/*import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(
        `sql ejecutado: ${text} duracion:${duration} filas:${res.rowCount}`,
    );
    return res;
};
*/
