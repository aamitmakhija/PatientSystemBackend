const Doctor = require('../models/user');  

exports.createDoctor = async (req, res) => {
    const { username, name, password, role } = req.body;

    if (!username || !name || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ username });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists.' });
        }

        const newDoctor = new Doctor({ username, name, password, role: 'doctor' });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Update doctor details
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor updated successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get doctor details
exports.getDoctorDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};