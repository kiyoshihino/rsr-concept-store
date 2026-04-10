import { sql } from "@vercel/postgres";

// Admin password hash for: #211938Mbt
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ||
  "$2b$12$gzSXJaDcO0tqt6LM2qpki.ZQqBOjiB2jQsbItnvGaq9crtRvviRrS";

export async function initDatabase() {
  try {
    // --- Tabela de usuários ---
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        cpf VARCHAR(14),
        birth_date DATE,
        role VARCHAR(20) NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Add role column if table already exists (migration)
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer'
    `;

    // --- Tabela de produtos ---
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        image VARCHAR(500),
        stock INT DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        weight DECIMAL(10, 3) DEFAULT 0.500,
        length DECIMAL(10, 2) DEFAULT 20.00,
        width DECIMAL(10, 2) DEFAULT 15.00,
        height DECIMAL(10, 2) DEFAULT 10.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Add physical fields if table already exists (migration)
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS weight DECIMAL(10, 3) DEFAULT 0.500`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS length DECIMAL(10, 2) DEFAULT 20.00`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS width DECIMAL(10, 2) DEFAULT 15.00`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS height DECIMAL(10, 2) DEFAULT 10.00`;

    // --- Tabela de endereços ---
    await sql`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        label VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        number VARCHAR(20) NOT NULL,
        complement VARCHAR(100),
        neighborhood VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(2) NOT NULL,
        cep VARCHAR(9) NOT NULL,
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // --- Tabela de pedidos ---
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(30) PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'processing',
        total DECIMAL(10,2) NOT NULL,
        shipping_address_id INT REFERENCES addresses(id) ON DELETE SET NULL,
        tracking_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // --- Tabela de itens do pedido ---
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(30) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE SET NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(500)
      )
    `;

    // --- Tabela de favoritos ---
    await sql`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_favorite UNIQUE (user_id, product_id)
      )
    `;

    // --- Seed: usuário admin ---
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('AART Digital', 'comercial@aartdigital.com.br', ${ADMIN_PASSWORD_HASH}, 'admin')
      ON CONFLICT (email) DO UPDATE SET role = 'admin', password = ${ADMIN_PASSWORD_HASH}
    `;

    // --- Seed: produtos de exemplo ---
    await sql`
      INSERT INTO products (name, description, price, category, image, stock, is_featured)
      VALUES
        ('Cardigan Oversized Tricô', 'Cardigan oversized feito em tricô manual, macio e aconchegante.', 289.90, 'Vestuário', '/banner/1.png', 10, true),
        ('Bolsa Croché', 'Bolsa artesanal em croché com alça de argola elegante.', 159.90, 'Acessórios', '/banner/Bolsa croche.png', 8, true),
        ('Manta Peluda Cloud', 'Manta super macia em ponto cloud, perfeita para relaxar.', 219.90, 'Decoração', '/banner/Manta Peluda Cloud.png', 5, false),
        ('Almofada de Croché', 'Almofada artesanal em croché com textura única.', 129.90, 'Decoração', '/banner/Almofada Croche.png', 12, false),
        ('Vestido Midi Croisé', 'Vestido midi elegante em ponto croisé com silhueta fluida.', 349.90, 'Vestuário', '/banner/Vestido.png', 6, true),
        ('Cestos Organizadores', 'Conjunto de cestos organizadores artesanais em croché.', 149.90, 'Decoração', '/banner/cestos organizadores de crochê.png', 7, false),
        ('Cachecol Infinity', 'Cachecol infinity em tricô nos tons terrosos da temporada.', 129.90, 'Acessórios', '/banner/Inverno.png', 15, false),
        ('Kit Iniciação Croché', 'Kit completo com fios, agulhas e padrões para iniciantes.', 99.90, 'Kits', '/banner/Acessórios.png', 20, false)
      ON CONFLICT DO NOTHING
    `;

    console.log("✅ Banco de dados inicializado com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao inicializar banco:", error);
    return { success: false, error: String(error) };
  }
}

export default initDatabase;