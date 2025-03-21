const mongoose = require('mongoose');


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
            required: [true, 'Ward is required'],   
        },
        doctorAssigned:{
            type: String,
            trim: true,  
        },
        dateOfAdmission:{
            type: Date,
            default: Date.now,  
        },
        dischargedAt: {
            type: Date,
            validate: {
                
                validator: function (value) {
                    return !value || value >= this.dateOfAdmission;
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
