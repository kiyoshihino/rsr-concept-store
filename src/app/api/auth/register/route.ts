import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, cpf } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const pool = getPool();
    
    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    const [result]: any = await pool.execute(
      "INSERT INTO users (name, email, password, phone, cpf) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone || null, cpf || null]
    );

    const [users] = await pool.execute(
      "SELECT id, name, email, phone, cpf, birth_date FROM users WHERE id = ?",
      [result.insertId]
    );

    const user = (users as any[])[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        birthDate: user.birth_date
      }
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const pool = getPool();

    if (email) {
      const [users] = await pool.execute(
        "SELECT id, name, email, phone, cpf, birth_date FROM users WHERE email = ?",
        [email]
      );
      return NextResponse.json({ users: users });
    }

    const [users] = await pool.execute(
      "SELECT id, name, email, phone, cpf, birth_date FROM users"
    );

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}