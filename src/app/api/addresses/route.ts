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
    const [addresses] = await pool.execute(
      "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
      [userId]
    );

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    return NextResponse.json(
      { error: "Erro ao buscar endereços" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, label, street, number, complement, neighborhood, city, state, cep, isDefault } = await request.json();

    if (!userId || !label || !street || !number || !neighborhood || !city || !state || !cep) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const pool = getPool();

    if (isDefault) {
      await pool.execute(
        "UPDATE addresses SET is_default = false WHERE user_id = ?",
        [userId]
      );
    }

    const [result]: any = await pool.execute(
      `INSERT INTO addresses (user_id, label, street, number, complement, neighborhood, city, state, cep, is_default) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, label, street, number, complement || null, neighborhood, city, state, cep, isDefault || false]
    );

    const [addresses] = await pool.execute(
      "SELECT * FROM addresses WHERE id = ?",
      [result.insertId]
    );

    return NextResponse.json({
      success: true,
      address: (addresses as any[])[0]
    });
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    return NextResponse.json(
      { error: "Erro ao criar endereço" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, userId, label, street, number, complement, neighborhood, city, state, cep, isDefault } = await request.json();

    if (!id || !userId) {
      return NextResponse.json(
        { error: "ID e userId são obrigatórios" },
        { status: 400 }
      );
    }

    const pool = getPool();

    if (isDefault) {
      await pool.execute(
        "UPDATE addresses SET is_default = false WHERE user_id = ?",
        [userId]
      );
    }

    await pool.execute(
      `UPDATE addresses SET label = ?, street = ?, number = ?, complement = ?, neighborhood = ?, city = ?, state = ?, cep = ?, is_default = ? 
       WHERE id = ? AND user_id = ?`,
      [label, street, number, complement || null, neighborhood, city, state, cep, isDefault || false, id, userId]
    );

    const [addresses] = await pool.execute(
      "SELECT * FROM addresses WHERE id = ?",
      [id]
    );

    return NextResponse.json({
      success: true,
      address: (addresses as any[])[0]
    });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar endereço" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const userId = request.nextUrl.searchParams.get("userId");
    
    if (!id || !userId) {
      return NextResponse.json(
        { error: "ID e userId são obrigatórios" },
        { status: 400 }
      );
    }

    const pool = getPool();
    await pool.execute(
      "DELETE FROM addresses WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir endereço:", error);
    return NextResponse.json(
      { error: "Erro ao excluir endereço" },
      { status: 500 }
    );
  }
}