const express = require('express');

const db = require('./config/db');
const collectionRoutes = require('./routes/collectionPointRoutes');
const wasteRoutes = require('./routes/wasteTypeRoutes');
const reportRoutes = require('./routes/recyclingReportRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.get('/api/health/db', async (req, res) => {
    try {
        const status = await db.checkConnection();
        res.json({ ok: true, dbTime: status.now });
    } catch (err) {
        res.status(503).json({
            ok: false,
            error: err.message,
            hint: 'Проверьте переменные PGHOST/PGPORT/PGDATABASE/PGUSER/PGPASSWORD и что PostgreSQL запущен.'
        });
    }
});

app.use('/api/collection-points', collectionRoutes);
app.use('/api/waste-types', wasteRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

app.use(express.static('public'));

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
