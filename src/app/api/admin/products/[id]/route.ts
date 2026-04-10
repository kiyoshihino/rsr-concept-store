import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pool = getPool();
    const [products]: any = await pool.execute("SELECT * FROM products WHERE id = $1", [id]);
    
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
    const { 
      name, price, category, description, image, stock, is_featured,
      weight, length, width, height
    } = body;

    const pool = getPool();
    await pool.execute(
      `UPDATE products SET name = $1, price = $2, category = $3, description = $4, 
       image = $5, stock = $6, is_featured = $7, weight = $8, length = $9, 
       width = $10, height = $11 WHERE id = $12`,
      [
        name, 
        price, 
        category, 
        description, 
        image, 
        stock, 
        is_featured,
        weight || 0.500,
        length || 20.00,
        width || 15.00,
        height || 10.00,
        id
      ]
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
    await pool.execute("DELETE FROM products WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}