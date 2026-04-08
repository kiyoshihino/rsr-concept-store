import { NextResponse } from "next/server";
import initDatabase from "@/lib/init-db";

export async function GET() {
  try {
    const result = await initDatabase();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao inicializar banco de dados" },
      { status: 500 }
    );
  }
}