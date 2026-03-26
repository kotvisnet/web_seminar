const db = require('../config/db');

const getAll = async () => {
    const result = await db.query('SELECT * FROM collection_points ORDER BY id');
    return result.rows;
};

const getById = async (id) => {
    const result = await db.query('SELECT * FROM collection_points WHERE id=$1', [id]);
    return result.rows[0] || null;
};

const create = async (name, city, address) => {
    const result = await db.query(
        'INSERT INTO collection_points (name, city, address) VALUES ($1, $2, $3) RETURNING *',
        [name, city, address]
    );
    return result.rows[0];
};

const update = async (id, name, city, address) => {
    const result = await db.query(
        'UPDATE collection_points SET name=$1, city=$2, address=$3 WHERE id=$4 RETURNING *',
        [name, city, address, id]
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM collection_points WHERE id=$1 RETURNING id', [id]);
    return Boolean(result.rows[0]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
