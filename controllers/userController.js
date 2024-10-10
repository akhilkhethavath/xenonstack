const User = require('../models/User');

// Get user details for the authenticated user
exports.getUserDetails = async (req, res) => {
    try {
        // req.user.userId comes from the JWT token that was verified by authMiddleware
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
