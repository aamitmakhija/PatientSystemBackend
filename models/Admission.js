const mongoose = require('mongoose');

// Schema for storing admission details of a patient
const AdmissionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',  // Reference to the Patient model
            required: [true, 'Patient ID is required'],  // Ensure patient ID is provided
        },
        ward: {
            type: String,
            required: [true, 'Ward is required'],  // Ensure ward is specified
            enum: ['ICU', 'General', 'Pediatrics', 'Surgery'],  // Allowed ward types
        },
        doctor: {
            type: String,
            trim: true,  // Remove extra spaces from the doctor's name
        },
        admittedAt: {
            type: Date,
            default: Date.now,  // Set default value to current time
        },
        dischargedAt: {
            type: Date,
            validate: {
                // Ensure discharge date is not earlier than admission date
                validator: function (value) {
                    return !value || value >= this.admittedAt;
                },
                message: 'Discharge date cannot be earlier than admission date',
            },
        },
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Admission', AdmissionSchema);