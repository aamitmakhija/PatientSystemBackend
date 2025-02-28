const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  disease: { type: String },
  servicePoint: { type: String, required: true }, // OPD, A&E, etc.
  diagnosis: { type: String },
  registrationDate: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;