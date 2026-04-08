import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log("Pool de conexão criado");
    } catch (error) {
      console.error("Erro ao criar pool:", error);
      throw error;
    }
  }
  return pool;
}

export async function query<T>(sql: string, params?: unknown[]): Promise<T> {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params as never);
  return rows as T;
}

export default getPool();