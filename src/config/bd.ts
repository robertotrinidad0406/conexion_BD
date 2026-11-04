import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || process.env.PGHOST || "localhost",
        port: Number(process.env.DB_PORT || process.env.PGPORT) || 5432,
        database: process.env.DB_NAME || process.env.PGDATABASE || "postgres",
        user: process.env.DB_USER || process.env.PGUSER || "postgres",
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
      }
);
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
export default pool;
 main

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
