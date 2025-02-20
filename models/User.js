const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema for user data, including authentication and roles
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,  // Ensure the username is unique
            trim: true,  // Remove leading/trailing spaces
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        role: {
            type: String,
            enum: ['admin', 'doctor', 'nurse', 'clerk'],  // Roles allowed for the user
            required: [true, 'Role is required'],
        },
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt
    }
);

// Pre-save hook to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Skip hashing if password is not modified
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash password with salt
    next();
});

// Method to compare entered password with the stored hash during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  // Compare hashed password
};

module.exports = mongoose.model('User', UserSchema);