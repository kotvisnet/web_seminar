CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE NOT NULL,
    total_points NUMERIC(12, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS waste_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    eco_points_per_kg NUMERIC(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS collection_points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(120) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recycling_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    waste_type_id INTEGER NOT NULL REFERENCES waste_types(id) ON DELETE RESTRICT,
    collection_point_id INTEGER NOT NULL REFERENCES collection_points(id) ON DELETE RESTRICT,
    weight_kg NUMERIC(10, 2) NOT NULL CHECK (weight_kg > 0),
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
