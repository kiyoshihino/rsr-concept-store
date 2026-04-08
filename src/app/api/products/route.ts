import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const pool = getPool();
    const [products] = await pool.execute("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}