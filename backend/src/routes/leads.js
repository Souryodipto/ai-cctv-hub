const express = require('express');
const router = express.Router();

// TODO: Import Lead model once DB is set up
// const Lead = require('../models/Lead');

/**
 * POST /api/leads
 * Submit a new customer lead from the website form
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, businessType, message } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }

        // TODO: Save to database
        // const lead = new Lead({ name, email, phone, businessType, message });
        // await lead.save();

        // TODO: Send notification email to admin

        console.log('[NEW LEAD]', { name, email, phone, businessType });

        res.status(201).json({
            success: true,
            message: 'Thank you! We will get back to you shortly.',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit lead.' });
    }
});

/**
 * GET /api/leads
 * Get all leads (admin protected — add auth middleware later)
 */
router.get('/', async (req, res) => {
    try {
        // TODO: Add auth middleware and fetch from DB
        // const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ message: 'Auth required. Implement admin auth here.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leads.' });
    }
});

module.exports = router;
