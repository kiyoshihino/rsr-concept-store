import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE, COOKIE_OPTIONS } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const [users]: any = await pool.execute(
      "SELECT id, name, email, phone, cpf, birth_date, password, role FROM users WHERE email = $1",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 }
      );
    }

    const isAdmin = user.role === "admin";

    // Create signed session cookie
    const token = await createSessionToken({
      userId: user.id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      isAdmin,
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        birthDate: user.birth_date,
        isAdmin,
      },
    });

    response.cookies.set(SESSION_COOKIE, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}