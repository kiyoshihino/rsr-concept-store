import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const [favorites] = await pool.execute(
      `SELECT p.* FROM favorites f
       JOIN products p ON f.product_id = p.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar favoritos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "userId e productId são obrigatórios" },
        { status: 400 }
      );
    }

    const pool = getPool();

    const [existing] = await pool.execute(
      "SELECT id FROM favorites WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if ((existing as any[]).length > 0) {
      await pool.execute(
        "DELETE FROM favorites WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      return NextResponse.json({ success: true, isFavorite: false });
    }

    await pool.execute(
      "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)",
      [userId, productId]
    );

    return NextResponse.json({ success: true, isFavorite: true });
  } catch (error) {
    console.error("Erro ao favoritar:", error);
    return NextResponse.json(
      { error: "Erro ao favoritar" },
      { status: 500 }
    );
  }
}