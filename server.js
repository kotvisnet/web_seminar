const express = require('express');
const app = express();

// Подключаем роуты
const collectionRoutes = require('./routes/collectionPointRoutes');
const wasteRoutes = require('./routes/wasteTypeRoutes');
const reportRoutes = require('./routes/recyclingReportRoutes');

// Middleware
app.use(express.json());

// API маршруты с отдельными префиксами
app.use('/api/collection-points', collectionRoutes);
app.use('/api/waste-types', wasteRoutes);
app.use('/api/reports', reportRoutes);

// Статика (HTML)
app.use(express.static('public'));

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
