
const Patient = require('../models/Patient');  

exports.createPatient = async (req, res) => {
    const { firstName, lastName, dateOfBirth, knownDiseases, servicePoint } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !servicePoint) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new patient
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            knownDiseases,
            servicePoint,
        });

        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
    } catch (err) {
        res.status(500).json({ message: 'Error creating patient', error: err });
    }
};