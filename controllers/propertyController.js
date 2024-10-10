const Property = require('../models/property');

// Add a new property
exports.addProperty = async (req, res) => {
    const { title, price, location, type, description, imageUrl } = req.body;

    try {
        // Create a new property
        const property = new Property({
            title,
            price,
            location,
            type,
            description,
            imageUrl
        });

        // Save property to the database
        await property.save();

        res.status(201).json({ message: 'Property added successfully', property });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add property' });
    }
};

// Get list of all properties
exports.getProperties = async (req, res) => {
    try {
        // Fetch all properties from the database
        const properties = await Property.find();

        res.status(200).json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};
