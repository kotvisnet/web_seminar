const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER || 'polina',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'mydb',
    password: process.env.PGPASSWORD || 'polinaalt1',
    port: Number(process.env.PGPORT || 5432),
    max: 10,
    idleTimeoutMillis: 10000
});

pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err.message);
});

const query = (text, params) => pool.query(text, params);

const checkConnection = async () => {
    const result = await pool.query('SELECT NOW() AS now');
    return result.rows[0];
};

module.exports = {
    query,
    checkConnection,
    pool
};
