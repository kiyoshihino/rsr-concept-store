import { getPool } from "@/lib/db";

const schema = `
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cpf VARCHAR(14),
  birth_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  image VARCHAR(500),
  stock INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de endereços
CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(20) PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('processing', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing',
  total DECIMAL(10,2) NOT NULL,
  shipping_address_id INT,
  tracking_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE SET NULL
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(20) NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, product_id)
);

-- Inserir produtos de exemplo
INSERT IGNORE INTO products (id, name, description, price, category, is_featured) VALUES
(1, 'T-Shirt Algodão Premium', 'Camiseta 100% algodão, cores variadas', 79.90, 'T-Shirts', true),
(2, 'Moletom Conforto', 'Moletom com capuz, macio e quentinho', 129.90, 'Moletons', true),
(3, 'Regata Fitness Pro', 'Regata para academia, tecido respirável', 89.90, 'Moda Fitness', false),
(4, 'Shorts Performance', 'Shorts ideal para treino', 69.90, 'Moda Fitness', false),
(5, 'Jaqueta Couro Italiano', 'Jaqueta em couro legítimo, design moderno', 299.90, 'Couro', true),
(6, 'Bolsa Carteira Couro', 'Bolsa em couro, elegante e prática', 159.90, 'Acessórios', false),
(7, 'Uniforme Escolar Conjunto', 'Conjunto para uniforme escolar', 89.90, 'Uniforme Escolar', false),
(8, 'Camiseta Básica Algodão', 'Camiseta básica cores variadas', 49.90, 'T-Shirts', false);
`;

export async function initDatabase() {
  try {
    const pool = getPool();
    const statements = schema.split(";").filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.execute(statement);
        console.log("Tabela criada/atualizada");
      }
    }
    
    console.log("Banco de dados inicializado com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro ao inicializar banco:", error);
    return { success: false, error };
  }
}

export default initDatabase;