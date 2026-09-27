-- -- Run this once to set up the database: psql -U postgres -d shopsphere -f schema.sql

-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(150) UNIQUE NOT NULL,
--   password_hash VARCHAR(255) NOT NULL,
--   is_admin BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS products (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(200) NOT NULL,
--   description TEXT,
--   price NUMERIC(10,2) NOT NULL,
--   image_url VARCHAR(500),
--   stock INT DEFAULT 0,
--   created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS cart_items (
--   id SERIAL PRIMARY KEY,
--   user_id INT REFERENCES users(id) ON DELETE CASCADE,
--   product_id INT REFERENCES products(id) ON DELETE CASCADE,
--   quantity INT NOT NULL DEFAULT 1,
--   UNIQUE(user_id, product_id)
-- );

-- -- Sample data
-- INSERT INTO products (name, description, price, image_url, stock) VALUES
-- ('Wireless Headphones', 'Over-ear Bluetooth headphones with noise cancellation', 2499.00, 'https://via.placeholder.com/300', 50),
-- ('Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 3999.00, 'https://via.placeholder.com/300', 30),
-- ('Backpack', 'Water-resistant laptop backpack, 20L capacity', 1299.00, 'https://via.placeholder.com/300', 100),
-- ('Coffee Mug', 'Ceramic coffee mug, 350ml', 299.00, 'https://via.placeholder.com/300', 200)
-- ON CONFLICT DO NOTHING;
