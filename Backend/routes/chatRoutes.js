const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/chat/:userId
// @desc    Get conversation between current user and specified user
// @access  Private
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const otherUserId = req.params.userId;
        const currentUserId = req.userId;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, recipient: otherUserId },
                { sender: otherUserId, recipient: currentUserId }
            ]
        })
            .sort({ createdAt: 1 }) // Oldest to newest
            .populate('sender', 'fullName')
            .populate('recipient', 'fullName')
            .populate('app', 'title');

        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error('Get chat error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/chat
// @desc    Send a message
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { recipientId, content, appId } = req.body;
        const senderId = req.userId;

        const message = new Message({
            sender: senderId,
            recipient: recipientId,
            content,
            app: appId || null
        });

        await message.save();

        // Populate to return full info immediately if needed
        await message.populate('sender', 'fullName');
        await message.populate('recipient', 'fullName');
        if (appId) {
            await message.populate('app', 'title');
        }

        res.status(201).json({
            success: true,
            message
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
