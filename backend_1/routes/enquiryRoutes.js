// backend/routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const { createEnquiry,getEnquiriesByUser } = require('../controllers/enquiryController');

// POST /api/enquiries
router.post('/', createEnquiry);
router.get('/:userId', getEnquiriesByUser);


module.exports = router;
