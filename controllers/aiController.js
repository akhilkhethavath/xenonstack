const Property = require('../models/Property');
const User = require('../models/user');

// AI-driven property recommendation based on user browsing history
exports.recommendProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const preferences = user.preferences;

        const properties = await Property.find({ type: { $in: preferences } }).limit(5);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: 'Failed to recommend properties' });
    }
};
