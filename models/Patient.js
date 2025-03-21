const mongoose = require('mongoose');

// Schema for storing patient details
const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,  // Remove leading/trailing spaces
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age must be a positive number'],  // Ensure age is non-negative
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other'],  // Restrict gender to valid options
        },
        contact: {
            type: String,
            validate: {
                // Validate that the phone number is a 10-digit number
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        symptoms: {
            type: String,
            trim: true,  // Remove extra spaces from symptoms
            default: 'Not specified',  // Default value if no symptoms are provided
        },
        registrationType:{ //Added registration type
            type: String, 
            enum:['OPD','A&E'], 
            required: true
        },
    },
    {
        timestamps: true,  // Automatically add createdAt and updatedAt fields
    }
);

// Export the Patient model
module.exports = mongoose.model('Patient', PatientSchema);