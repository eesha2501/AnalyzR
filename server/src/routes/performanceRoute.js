const express = require('express');
const router = express.Router();
const { analyzePerformance } = require('../controllers/performanceController');

router.post('/', analyzePerformance);

module.exports = router;
