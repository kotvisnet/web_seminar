const db = require('../config/db');

// Получить все отчёты + посчитать баллы
const getAll = async () => {
    const result = await db.query(`
        SELECT 
            r.id,
            r.user_id,
            r.waste_type_id,
            r.collection_point_id,
            r.weight_kg,
            (w.eco_points_per_kg * r.weight_kg) AS "earnedPoints"
        FROM recycling_reports r
        JOIN waste_types w ON r.waste_type_id = w.id
        ORDER BY r.id
    `);
    return result.rows;
};

// Создать отчет + начислить баллы
const createReport = async (user_id, waste_type_id, collection_point_id, weight_kg) => {
    // 1. Получаем eco_points_per_kg
    const waste = await db.query(
        'SELECT eco_points_per_kg FROM waste_types WHERE id=$1',
        [waste_type_id]
    );

    if (waste.rows.length === 0) {
        throw new Error('Waste type not found');
    }

    const pointsPerKg = waste.rows[0].eco_points_per_kg;
    const earnedPoints = pointsPerKg * weight_kg;

    // 2. Добавляем отчет
    const report = await db.query(
        `INSERT INTO recycling_reports
        (user_id, waste_type_id, collection_point_id, weight_kg, date)
        VALUES ($1, $2, $3, $4, CURRENT_DATE)
        RETURNING *`,
        [user_id, waste_type_id, collection_point_id, weight_kg]
    );

    // 3. Обновляем баллы пользователя
    await db.query(
        'UPDATE users SET total_points = total_points + $1 WHERE id=$2',
        [earnedPoints, user_id]
    );

    return {
        report: report.rows[0],
        earnedPoints
    };
};

// Экспорт
module.exports = {
    getAll,
    createReport
};
