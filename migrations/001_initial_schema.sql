CREATE TABLE IF NOT EXISTS watchlist (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);