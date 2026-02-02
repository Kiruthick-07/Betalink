const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/reviews/:appId
// @desc    Get reviews for a specific app
// @access  Private
router.get('/:appId', authMiddleware, async (req, res) => {
    try {
        const reviews = await Review.find({ app: req.params.appId })
            .populate('tester', 'fullName email') // Get tester details
            .sort({ createdAt: 1 }); // Oldest first as per requirement

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private (Tester)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { appId, rating, content } = req.body;

        const review = new Review({
            app: appId,
            tester: req.userId,
            rating,
            content
        });

        await review.save();

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            review
        });
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
