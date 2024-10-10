const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User signup
exports.signup = async (req, res) => {
    const { email, password, name, phone, address } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user with additional details
        const user = new User({
            email,
            password,
            name,
            phone,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
                country: address.country
            }
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, // Payload: user ID
            process.env.JWT_SECRET, // Secret key from .env
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Return the token and user info (without password)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User creation failed' });
    }
};


// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send response with token and user data (excluding password)
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
