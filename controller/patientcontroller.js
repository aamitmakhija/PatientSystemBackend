const Patient = require('../models/patient'); // Assuming Patient model is set up

// Register a new patient
const registerPatient = async (req, res) => {
  const { name, age, servicePoint } = req.body;

  if (!name || !age || !servicePoint) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newPatient = new Patient({
      name,
      age,
      servicePoint,
    });

    await newPatient.save();
    res.status(201).json({ patientId: newPatient._id });  // Return the created patient's ID
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a patient by ID
const getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a patient by ID
const updatePatientById = async (req, res) => {
  const patientId = req.params.id;
  const updateData = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a patient by ID
const deletePatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
};