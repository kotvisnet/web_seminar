const express = require('express');

const collectionRoutes = require('./routes/collectionPointRoutes');
const wasteRoutes = require('./routes/wasteTypeRoutes');
const reportRoutes = require('./routes/recyclingReportRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/collection-points', collectionRoutes);
app.use('/api/waste-types', wasteRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
