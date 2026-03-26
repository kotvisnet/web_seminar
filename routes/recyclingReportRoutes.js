const express = require('express');
const router = express.Router();
const controller = require('../controllers/recyclingReportController');

router.get('/', controller.getAll); // 👈 добавить
router.post('/', controller.create);

module.exports = router;
