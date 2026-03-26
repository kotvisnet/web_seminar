const db = require('../config/db');

const getAll = async () => {
    const result = await db.query('SELECT * FROM users ORDER BY id');
    return result.rows;
};

const getById = async (id) => {
    const result = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return result.rows[0] || null;
};

const create = async (name, email) => {
    const result = await db.query(
        `INSERT INTO users (name, email, total_points)
         VALUES ($1, $2, 0)
         RETURNING *`,
        [name, email]
    );
    return result.rows[0];
};

const update = async (id, name, email) => {
    const result = await db.query(
        'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
        [name, email, id]
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM users WHERE id=$1 RETURNING id', [id]);
    return Boolean(result.rows[0]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
