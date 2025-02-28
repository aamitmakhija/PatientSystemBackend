const express = require('express');
const Patient = require('../models/Patient');
const authenticateToken = require('../middlewares/authMiddleware');  // Authentication middleware
const authorizeRole = require('../middlewares/authorizeRole');  // Authorization middleware
const router = express.Router();

// Basic route to test if the API is working
router.get('/', (req, res) => {
    res.send('Patients API is working!');
});

// Register a new patient (Only Clerks have access)
router.post('/register', authenticateToken, authorizeRole(['clerk']), async (req, res) => {
    try{
        const{name, age, gender, contact, symptoms, registrationType}= req.body;
        const patient= new Patient({name, age, gender, contact, symptoms, registrationType});
        await patient.save();
        res.status(201).json({message:"Patient registered successfully!!", patient});
    } catch(error){
        res.status(500).json({message: "Patient registration unsuccessful :(", details: error.message});
    }
});

// Get patient details (Accessible by doctors, nurses, and admins)
router.get('/view/:id', authenticateToken, authorizeRole(['doctor', 'nurse', 'admin']), async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Return the patient details
        res.status(200).json({ patient });
    } catch (err) {
        // Handle errors and send a bad request response
        res.status(400).json({ message: err.message });
    }
});

// Update patient details (Accessible by doctors and nurses)
router.put('/update/:id', authenticateToken, authorizeRole(['doctor', 'nurse']), async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Return updated patient details
        res.status(200).json({ message: 'Patient details updated', updatedPatient });
    } catch (err) {
        // Handle errors and send a bad request response
        res.status(400).json({ message: err.message });
    }
});

// Delete patient record (Only doctors have access)
router.delete('/delete/:id', authenticateToken, authorizeRole('doctor'), async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Return success message after deletion
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        // Handle errors and send a bad request response
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;