const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if the model already exists
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'nurse', 'clerk', 'pathologist'],  // 5 user roles for hospital staff 
        required: true,
    }
}, { timestamps: true });

// Hash password before saving or updating
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare entered password with stored hash
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model already exists, and use it if so
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;