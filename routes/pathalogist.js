const express = require('express');
const authenticateToken = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const { updateDiagnosis } = require('../controller/pathalogistcontroller'); // Controller for pathologist
const router = express.Router();

// Route for pathologist to update diagnosis for a patient
router.put('/patients/:id/diagnosis', authenticateToken, authorizeRole(['pathologist']), updateDiagnosis);

module.exports = router;