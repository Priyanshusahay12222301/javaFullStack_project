const express = require('express');
const { centers } = require('../data');
const router = express.Router();

// GET /api/centers - return all centers
router.get('/', (req, res) => res.json(centers));

module.exports = router; 