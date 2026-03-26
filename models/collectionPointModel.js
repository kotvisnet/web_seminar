const db = require('../config/db');

// Получить все пункты
const getAll = async () => {
    const result = await db.query('SELECT * FROM collection_points');
    return result.rows;
};

// Создать пункт
const create = async (name, city, address) => {
    const result = await db.query(
        'INSERT INTO collection_points (name, city, address) VALUES ($1, $2, $3) RETURNING *',
        [name, city, address]
    );
    return result.rows[0];
};

// Обновить пункт
const update = async (id, name, city, address) => {
    const result = await db.query(
        'UPDATE collection_points SET name=$1, city=$2, address=$3 WHERE id=$4 RETURNING *',
        [name, city, address, id]
    );
    return result.rows[0];
};

// Удалить пункт
const remove = async (id) => {
    await db.query(
        'DELETE FROM collection_points WHERE id=$1',
        [id]
    );
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
