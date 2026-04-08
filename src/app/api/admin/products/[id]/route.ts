import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pool = getPool();
    const [products]: any = await pool.execute("SELECT * FROM products WHERE id = ?", [id]);
    
    if (products.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    
    return NextResponse.json({ product: products[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, category, description, image, stock, is_featured } = body;

    const pool = getPool();
    await pool.execute(
      `UPDATE products SET name = ?, price = ?, category = ?, description = ?, 
       image = ?, stock = ?, is_featured = ? WHERE id = ?`,
      [name, price, category, description, image, stock, is_featured, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pool = getPool();
    await pool.execute("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}