import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [orders] = await pool.execute("SELECT * FROM orders ORDER BY created_at DESC");
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    const pool = getPool();
    await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Erro ao atualizar pedido" }, { status: 500 });
  }
}