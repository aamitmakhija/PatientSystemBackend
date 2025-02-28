const mongoose = require('mongoose');

// Schema for storing admission details of a patient
const AdmissionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',  //  Referring to the Patient model
            required: [true, 'Patient ID is required'],  // Ensure patient ID is provided
        },
        wardType: {
            type: String,
            required: [true, 'Ward is required'],  // Ensure ward is specified
            enum: ['Medicine A',       'Medicine B',       'Medicine C',       'Medicine D',
                'Surgery A',        'Surgery B',        'Surgery C',        'Surgery D', 
                'Orthopedics A',    'Orthopedics B',    'Orthopedics C',    'Orthopedics D',
                'Pediatrics A',     'Pediatrics B',     'Pediatrics C',     'Pediatrics D',
                'ENT A',            'ENT B',            'ENT C',            'ENT D',
                'Opthalmology A ',  'Opthalmology B ',  'Opthalmology C ',  'Opthalmology D', 
                'Gynecology A',     'Gynecology B',     'Gynecology C',     'Gynecology D',
                'Dermatology A',    'Dermatology B',    'Dermatology C',    'Dermatology D',
                'Oncology A',       'Oncology B',       'Oncology C',       'Oncology D',
                'ICU',              'CCU'],  // Allowed ward types
        },
        doctorAssigned:{
            type: String,
            required: true,
            trim:true, // Trims the doctors name without spaces
        },
        dateOfAdmission:{
            type: Date,
            default: Date.now, // Set default value to current time
        },
        dischargedAt: {
            type: Date,
            validate: {
                // Ensure discharge date is not earlier than admission date
                validator: function (value) {
                    return !value || value >= this.dateOfAdmission;
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
