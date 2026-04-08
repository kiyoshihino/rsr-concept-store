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
    
    const [orders]: any = await pool.execute(
      `SELECT o.*, 
        a.street, a.number, a.complement, a.neighborhood, a.city, a.state, a.cep
       FROM orders o
       LEFT JOIN addresses a ON o.shipping_address_id = a.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    const ordersArray = orders as any[];
    
    for (const order of ordersArray) {
      const [items]: any = await pool.execute(
        "SELECT * FROM order_items WHERE order_id = $1",
        [order.id]
      );
      order.items = items;
    }

    return NextResponse.json({ orders: ordersArray });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, items, total, shippingAddressId } = await request.json();

    if (!userId || !items || !total) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const orderId = "PED-" + Date.now();

    await pool.execute(
      `INSERT INTO orders (id, user_id, status, total, shipping_address_id) 
       VALUES ($1, $2, 'processing', $3, $4)`,
      [orderId, userId, total, shippingAddressId || null]
    );

    for (const item of items) {
      await pool.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, price, image) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, item.productId || null, item.name, item.quantity, item.price, item.image || null]
      );
    }

    return NextResponse.json({
      success: true,
      orderId
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}