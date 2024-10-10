const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "apartment", "house"
    description: { type: String },
    imageUrl: { type: String } // URL for property image
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
