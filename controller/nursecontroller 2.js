const Patient = require('../models/patient'); // Import Patient model

exports.updateVitalSigns = async (req, res) => {
    const { id } = req.params; // Get patient ID from the URL params
    const { temperature, bloodPressure, pulseRate } = req.body; // Get vital signs from the request body

    if (!temperature || !bloodPressure || !pulseRate) {
        return res.status(400).json({ message: 'All vital signs (temperature, bloodPressure, pulseRate) are required.' });
    }

    try {
        // Find the patient by ID and update vital signs
        const patient = await Patient.findByIdAndUpdate(
            id, 
            { temperature, bloodPressure, pulseRate },
            { new: true }  // Return the updated patient document
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Vital signs updated successfully', patient });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};