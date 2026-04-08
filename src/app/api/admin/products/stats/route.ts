import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [result]: any = await pool.execute("SELECT COUNT(*)::int as total FROM products");
    return NextResponse.json({ total: result[0].total });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ total: 0 });
  }
}