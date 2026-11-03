import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
      }
);

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
