const express = require('express');
const patientController = require('../controller/patientcontroller');  // Import the patient controller

const router = express.Router();

// Route to register a patient
router.post('/register', patientController.registerPatient);

// Route to get a patient by ID
router.get('/:id', (req, res) => {
    console.log('Fetching patient by ID:', req.params.id);  // Debugging log
    patientController.getPatientById(req, res);  // Call the controller's method
});

// Route to update a patient by ID
router.put('/:id', patientController.updatePatientById);

// Route to delete a patient by ID
router.delete('/:id', patientController.deletePatientById);

module.exports = router;  // Correctly export the router instance