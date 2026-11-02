import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

// Configuración del pool de conexiones usando la URL de tu archivo .env
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Función helper para realizar consultas fácilmente en los controladores
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;