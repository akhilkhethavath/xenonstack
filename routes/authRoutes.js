const express = require('express');
const { login, signup } = require('../controllers/authController');
const router = express.Router();

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

module.exports = router;
