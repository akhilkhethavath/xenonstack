const express = require('express');
const { addProperty, getProperties } = require('../controllers/propertyController');

const router = express.Router();

// Route to add a new property (protected)
router.post('/add', addProperty);

// Route to get a list of all properties (open to all users)
router.get('/all', getProperties);

module.exports = router;
