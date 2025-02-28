const Patient = require('../models/patient'); 

// Update diagnosis for a patient (only accessible by pathologist)
exports.updateDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { diagnosis } = req.body;

  if (!diagnosis) {
    return res.status(400).json({ message: 'Diagnosis is required.' });
  }

  try {
    // Find the patient by ID and update diagnosis
    const patient = await Patient.findByIdAndUpdate(id, { diagnosis }, { new: true });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Diagnosis updated successfully', patient });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};