const model = require('../models/collectionPointModel');

// Получить все
const getAll = async (req, res) => {
    try {
        const data = await model.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Создать
const create = async (req, res) => {
    const { name, city, address } = req.body;

    try {
        const newItem = await model.create(name, city, address);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Обновить
const update = async (req, res) => {
    const { id } = req.params;
    const { name, city, address } = req.body;

    try {
        const item = await model.update(id, name, city, address);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Удалить
const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await model.remove(id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
