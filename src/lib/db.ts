import { sql } from "@vercel/postgres";

export async function query<T>(query: string, params?: unknown[]): Promise<T[]> {
  try {
    // Note: Vercel Postgres uses $1, $2, etc. for parameters
    const { rows } = await sql.query(query, params);
    return rows as T[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to execute database query.");
  }
}

// Helper to handle the "execute" pattern from mysql2 in as few code changes as possible
export async function execute(queryStr: string, params?: unknown[]) {
  try {
    const { rows, fields } = await sql.query(queryStr, params);
    return [rows, fields];
  } catch (error) {
    console.error("Database Execute Error:", error);
    throw error;
  }
}

export const getPool = () => {
  return {
    execute: (queryStr: string, params?: unknown[]) => execute(queryStr, params),
  };
};

export default { query, execute, getPool };