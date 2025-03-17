const express = require('express');
const Patient = require('../models/patient');  // Import the Patient model
const authenticateToken = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authorizeRole');  // Import the role middleware

const router = express.Router();

// Clerk route to register a patient (Only accessible by clerk)
router.post('/register-patient', authenticateToken, authorizeRole(['clerk']), async (req, res) => {
    const { username, name, age, gender, disease, servicePoint } = req.body;

    // Validate required fields
    if (!username || !name || !age || !gender || !servicePoint) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new patient
        const newPatient = new Patient({
            username,
            name,
            age,
            gender,
            disease,
            servicePoint,
        });

        // Save the patient to the database
        await newPatient.save();

        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (err) {
        res.status(500).json({ message: 'Error registering patient', error: err });
    }
});

module.exports = router;