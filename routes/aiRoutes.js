const express = require('express');
const { recommendProperties } = require('../controllers/aiController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/recommend', authMiddleware, recommendProperties);

module.exports = router;
