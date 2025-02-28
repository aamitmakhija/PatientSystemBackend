const express = require('express');
const Patient = require('../models/patient'); // Import the Patient model
const authenticateToken = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authorizeRole');

const router = express.Router();

// Route to update diagnosis (only accessible by doctor)
router.put('/patients/:id/diagnosis', authenticateToken, authorizeRole(['doctor']), async (req, res) => {
  const { id } = req.params;
  const { diagnosis } = req.body;

  if (!diagnosis) {
      return res.status(400).json({ message: 'Diagnosis is required.' });
  }

  try {
      // Find the patient by ID and update diagnosis
      const patient = await Patient.findByIdAndUpdate(id, { diagnosis }, { new: true });

      if (!patient) {
          return res.status(404).json({ message: 'Patient not found.' });
      }

      res.status(200).json({ message: 'Diagnosis updated successfully.', patient });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;