const express = require('express');
const authenticateToken = require('../middleware/authmiddleware');
const Patient = require('../models/patient'); // Assuming Patient model is set up

const router = express.Router();

// Route to view patient details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;