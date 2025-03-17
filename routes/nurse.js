const express = require('express');
const authenticateToken = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const { updateVitalSigns } = require('../controller/nursecontroller');  // Import controller

const router = express.Router();

// Route for nurses to update vital signs (e.g., blood pressure, temperature, etc.)
router.put('/patients/:id/vital-signs', authenticateToken, authorizeRole(['nurse']), updateVitalSigns);  // Use controller

module.exports = router;