import { sql } from "@vercel/postgres";

const schema = `
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cpf VARCHAR(14),
  birth_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  image VARCHAR(500),
  stock INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de endereços
CREATE TABLE IF NOT EXISTS addresses (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(30) PRIMARY KEY,
  user_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'processing',
  total DECIMAL(10,2) NOT NULL,
  shipping_address_id INT,
  tracking_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE SET NULL
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(30) NOT NULL,
  product_id INT,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT unique_favorite UNIQUE (user_id, product_id)
);
`;

const seedData = `
-- Inserir produtos de exemplo
INSERT INTO products (name, description, price, category, is_featured) VALUES
('Cardigan Oversized Tricô', 'Cardigan oversized feito em tricô manual, macio e aconchegante.', 289.90, 'Vestuário', true),
('Bolsa Croché Argola', 'Bolsa artesanal em croché com alça de argola elegante.', 159.90, 'Acessórios', true),
('Manta Soft Home', 'Manta de tricô decorativa para sofá ou cama.', 199.90, 'Decoração', false),
('Kit Iniciação Croché', 'Kit completo para quem quer começar a fazer croché em casa.', 129.90, 'Kits', false),
('Suéter Gola Alta', 'Suéter de lã com gola alta, perfeito para o frio.', 249.90, 'Vestuário', true),
('Cachecol Infinito', 'Cachecol em tons terrosos, formato infinito.', 89.90, 'Acessórios', false)
ON CONFLICT DO NOTHING;
`;

export async function initDatabase() {
  try {
    // Split schema into individual commands for better error handling/execution
    const commands = schema.split(';').filter(cmd => cmd.trim());
    
    for (const cmd of commands) {
      await sql.query(cmd);
    }

    // Seed data
    const seeds = seedData.split(';').filter(cmd => cmd.trim());
    for (const seed of seeds) {
      await sql.query(seed);
    }
    
    console.log("Banco de dados inicializado com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro ao inicializar banco:", error);
    return { success: false, error: String(error) };
  }
}

export default initDatabase;