const model = require('../models/collectionPointModel');

const getAll = async (req, res) => {
    try {
        const data = await model.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const item = await model.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Collection point not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    const { name, city, address } = req.body;

    try {
        const newItem = await model.create(name, city, address);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, city, address } = req.body;

    try {
        const item = await model.update(id, name, city, address);
        if (!item) {
            return res.status(404).json({ error: 'Collection point not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await model.remove(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Collection point not found' });
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
