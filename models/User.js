const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },          // Full name of the user
    phone: { type: String, required: true },         // Phone number
    address: {
        street: { type: String, required: true },    // Street address
        city: { type: String, required: true },      // City
        state: { type: String, required: true },     // State
        zip: { type: String, required: true },       // Postal/Zip code
        country: { type: String, required: true }    // Country
    },
    profilePicture: { type: String, default: '' },   // URL of the profile picture
    preferences: { type: [String], default: [] }     // Array of preferred property types (e.g., "apartment", "house")
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
