const db = require('../config/db');

const getAll = async () => {
    const result = await db.query(`
        SELECT
            r.id,
            r.user_id,
            r.waste_type_id,
            r.collection_point_id,
            r.weight_kg,
            r.date,
            (w.eco_points_per_kg * r.weight_kg) AS "earnedPoints"
        FROM recycling_reports r
        JOIN waste_types w ON r.waste_type_id = w.id
        ORDER BY r.id
    `);
    return result.rows;
};

const getById = async (id) => {
    const result = await db.query(`
        SELECT
            r.id,
            r.user_id,
            r.waste_type_id,
            r.collection_point_id,
            r.weight_kg,
            r.date,
            (w.eco_points_per_kg * r.weight_kg) AS "earnedPoints"
        FROM recycling_reports r
        JOIN waste_types w ON r.waste_type_id = w.id
        WHERE r.id=$1
    `, [id]);
    return result.rows[0] || null;
};

const createReport = async (user_id, waste_type_id, collection_point_id, weight_kg) => {
    const waste = await db.query('SELECT eco_points_per_kg FROM waste_types WHERE id=$1', [waste_type_id]);
    if (waste.rows.length === 0) {
        throw new Error('Waste type not found');
    }

    const pointsPerKg = Number(waste.rows[0].eco_points_per_kg);
    const earnedPoints = pointsPerKg * Number(weight_kg);

    const report = await db.query(
        `INSERT INTO recycling_reports (user_id, waste_type_id, collection_point_id, weight_kg, date)
         VALUES ($1, $2, $3, $4, CURRENT_DATE)
         RETURNING *`,
        [user_id, waste_type_id, collection_point_id, weight_kg]
    );

    await db.query('UPDATE users SET total_points = total_points + $1 WHERE id=$2', [earnedPoints, user_id]);

    return {
        report: report.rows[0],
        earnedPoints
    };
};

const updateReport = async (id, user_id, waste_type_id, collection_point_id, weight_kg) => {
    const previous = await getById(id);
    if (!previous) {
        return null;
    }

    const waste = await db.query('SELECT eco_points_per_kg FROM waste_types WHERE id=$1', [waste_type_id]);
    if (waste.rows.length === 0) {
        throw new Error('Waste type not found');
    }

    const newPointsPerKg = Number(waste.rows[0].eco_points_per_kg);
    const newPoints = newPointsPerKg * Number(weight_kg);
    const oldPoints = Number(previous.earnedPoints || 0);

    const result = await db.query(
        `UPDATE recycling_reports
         SET user_id=$1, waste_type_id=$2, collection_point_id=$3, weight_kg=$4
         WHERE id=$5
         RETURNING *`,
        [user_id, waste_type_id, collection_point_id, weight_kg, id]
    );

    await db.query('UPDATE users SET total_points = total_points - $1 WHERE id=$2', [oldPoints, previous.user_id]);
    await db.query('UPDATE users SET total_points = total_points + $1 WHERE id=$2', [newPoints, user_id]);

    return {
        report: result.rows[0],
        earnedPoints: newPoints
    };
};

const removeReport = async (id) => {
    const report = await getById(id);
    if (!report) {
        return false;
    }

    await db.query('DELETE FROM recycling_reports WHERE id=$1', [id]);
    await db.query('UPDATE users SET total_points = total_points - $1 WHERE id=$2', [report.earnedPoints, report.user_id]);

    return true;
};

const getUserContribution = async (userId) => {
    const result = await db.query(
        `SELECT
            COALESCE(SUM(r.weight_kg), 0) AS total_weight,
            COALESCE(SUM(w.eco_points_per_kg * r.weight_kg), 0) AS total_points,
            COUNT(r.id) AS reports_count
         FROM recycling_reports r
         JOIN waste_types w ON r.waste_type_id = w.id
         WHERE r.user_id = $1`,
        [userId]
    );

    const stats = result.rows[0];
    const achievements = [];

    if (Number(stats.reports_count) >= 1) achievements.push('Первый отчет');
    if (Number(stats.reports_count) >= 10) achievements.push('10 отчетов');
    if (Number(stats.total_weight) >= 100) achievements.push('100 кг переработки');
    if (Number(stats.total_points) >= 1000) achievements.push('1000 эко-баллов');

    return {
        user_id: Number(userId),
        total_weight: Number(stats.total_weight),
        total_points: Number(stats.total_points),
        reports_count: Number(stats.reports_count),
        achievements
    };
};

module.exports = {
    getAll,
    getById,
    createReport,
    updateReport,
    removeReport,
    getUserContribution
};
