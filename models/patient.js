const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  disease: { type: String, required: false },
  registrationDate: { type: Date, default: Date.now },
  servicePoint: { type: String, required: true }, // Where the patient was registered (OPD, A&E, etc.)
  diagnosis: { type: String, required: false } // Add diagnosis field
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;