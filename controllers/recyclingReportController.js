const model = require('../models/recyclingReportModel');

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
        const report = await model.getById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    const { user_id, waste_type_id, collection_point_id, weight_kg } = req.body;

    try {
        const result = await model.createReport(user_id, waste_type_id, collection_point_id, weight_kg);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    const { user_id, waste_type_id, collection_point_id, weight_kg } = req.body;

    try {
        const result = await model.updateReport(req.params.id, user_id, waste_type_id, collection_point_id, weight_kg);
        if (!result) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await model.removeReport(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserContribution = async (req, res) => {
    try {
        const stats = await model.getUserContribution(req.params.userId);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getUserContribution
};
