const express = require('express');
const router = express.Router();

/**
 * POST /api/contact
 * Handle general contact form submissions
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        // TODO: Send email to admin using Nodemailer/SendGrid

        console.log('[CONTACT FORM]', { name, email, subject });

        res.status(200).json({
            success: true,
            message: 'Your message has been received. We will respond within 24 hours.',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

module.exports = router;
