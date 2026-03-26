const express = require('express');
const controller = require('../controllers/recyclingReportController');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/user/:userId/contribution', controller.getUserContribution);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
