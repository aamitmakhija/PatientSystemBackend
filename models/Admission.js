const mongoose = require('mongoose');


const AdmissionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
            ref: 'Patient',  //  Referring to the Patient model
            required: [true, 'Patient ID is required'],  // Ensure patient ID is provided
=======
            ref: 'Patient',  
            required: [true, 'Patient ID is required'],  
>>>>>>> e40f0174dfad25093bc2c05f51f257bb035bad20
        },
        wardType: {
            type: String,
<<<<<<< HEAD
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
=======
            required: [true, 'Ward is required'],  
            enum: ['ICU', 'General', 'Pediatrics', 'Surgery'],  
>>>>>>> e40f0174dfad25093bc2c05f51f257bb035bad20
        },
        doctorAssigned:{
            type: String,
<<<<<<< HEAD
            required: true,
            trim:true, // Trims the doctors name without spaces
=======
            trim: true,  
>>>>>>> e40f0174dfad25093bc2c05f51f257bb035bad20
        },
        dateOfAdmission:{
            type: Date,
<<<<<<< HEAD
            default: Date.now, // Set default value to current time
=======
            default: Date.now,  
>>>>>>> e40f0174dfad25093bc2c05f51f257bb035bad20
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
