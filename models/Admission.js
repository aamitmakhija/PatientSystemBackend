const mongoose = require('mongoose');


const AdmissionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',  
            required: [true, 'Patient ID is required'],  
        },
        ward: {
            type: String,
            required: [true, 'Ward is required'],  
            enum: ['ICU', 'General', 'Pediatrics', 'Surgery'],  
        },
        doctor: {
            type: String,
            trim: true,  
        },
        admittedAt: {
            type: Date,
            default: Date.now,  
        },
        dischargedAt: {
            type: Date,
            validate: {
                
                validator: function (value) {
                    return !value || value >= this.admittedAt;
                },
                message: 'Discharge date cannot be earlier than admission date',
            },
        },
    },
    {
        timestamps: true,  
    }
);

module.exports = mongoose.model('Admission', AdmissionSchema);