export const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  // Required for Supabase
});

export const connectToDatabase = async () => {
    const client = await pool.connect();
    return client;
};