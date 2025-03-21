const express = require('express');
const Patient = require('../models/patient.js');
const authenticateToken = require('../middleware/authmiddleware');  // Authentication middleware
const authorizeRole = require('../middleware/authorizeRole');  // Authorization middleware
const router = express.Router();
const Admission=require('../models/Admission');

router.get('/', (req, res) => { //Inital test to see if admissions module works
    res.send('Admissions API is working!');
});

// Admitting a patient into a ward using patientId

router.post('/admit', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
    const { patientId, wardType, doctorAssigned } = req.body;
        try {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' }); 
            }

            const admission = new Admission({ patientId, wardType, doctorAssigned, dateOfAdmission: new Date() });
            await admission.save();
        
            res.status(201).json({ message: 'Patient admitted successfully!', admission });
        } catch (error) {
            res.status(500).json({ message: 'Error admitting patient :(', details: error.message });
        }
});

// Fetching all patients in a ward
router.get('/wards/:wardType/patients', authenticateToken, authorizeRole(['doctor', 'nurse','clerk']), async (req, res) => {
    try {
        const { wardType } = req.params;
        const admissions = await Admission.find({ wardType }).populate('patientId');

        const patients = admissions.map(admission => ({
            id: admission.patientId._id,
            name: admission.patientId.name,
            age: admission.patientId.age,
            gender: admission.patientId.gender,
            contact: admission.patientId.contact,
            symptoms: admission.patientId.symptoms,
            wardType: admission.wardType,
            doctorAssigned:admission.doctorAssigned,
        }));

        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving patients :(', details: error.message });
    } 
});

module.exports = router;
    