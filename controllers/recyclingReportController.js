const model = require('../models/recyclingReportModel');

const getAll = async (req, res) => {
    try {
        const data = await model.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    const { user_id, waste_type_id, collection_point_id, weight_kg } = req.body;

    try {
        const result = await model.createReport(
            user_id,
            waste_type_id,
            collection_point_id,
            weight_kg
        );

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, create };
