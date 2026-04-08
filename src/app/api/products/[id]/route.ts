import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const pool = getPool();

    if (id) {
      const [products] = await pool.execute(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      return NextResponse.json({ products: (products as any[])[0] });
    }

    const [products] = await pool.execute("SELECT * FROM products ORDER BY created_at DESC");

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}