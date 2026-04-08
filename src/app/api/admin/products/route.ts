import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [products]: any = await pool.execute("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, category, description, image, stock, is_featured } = body;

    const pool = getPool();
    const [insertResult]: any = await pool.execute(
      `INSERT INTO products (name, price, category, description, image, stock, is_featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [name, price, category, description || "", image || "", stock || 0, is_featured || false]
    );

    return NextResponse.json({ success: true, id: insertResult[0].id });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}