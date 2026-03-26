const db = require('../config/db');

const getAll = async () => {
    const result = await db.query('SELECT * FROM waste_types ORDER BY id');
    return result.rows;
};

const getById = async (id) => {
    const result = await db.query('SELECT * FROM waste_types WHERE id=$1', [id]);
    return result.rows[0] || null;
};

const create = async (name, description, eco_points_per_kg) => {
    const result = await db.query(
        'INSERT INTO waste_types (name, description, eco_points_per_kg) VALUES ($1, $2, $3) RETURNING *',
        [name, description, eco_points_per_kg]
    );
    return result.rows[0];
};

const update = async (id, name, description, eco_points_per_kg) => {
    const result = await db.query(
        'UPDATE waste_types SET name=$1, description=$2, eco_points_per_kg=$3 WHERE id=$4 RETURNING *',
        [name, description, eco_points_per_kg, id]
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await db.query('DELETE FROM waste_types WHERE id=$1 RETURNING id', [id]);
    return Boolean(result.rows[0]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
