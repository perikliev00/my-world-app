const express = require('express');
const router = express.Router();
const World = require('../models/World');
const User = require('../models/User');

// API: Get all worlds
router.get('/worlds', async (req, res) => {
    try {
        const { page = 1, limit = 10, type, search } = req.query;
        const filter = { isPublic: true };
        
        if (type && type !== 'all') {
            filter.type = type;
        }
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const worlds = await World.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v');

        const total = await World.countDocuments(filter);

        res.json({
            success: true,
            data: {
                worlds,
                pagination: {
                    current: page,
                    pages: Math.ceil(total / limit),
                    total
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch worlds',
            error: error.message
        });
    }
});

// API: Get single world
router.get('/worlds/:id', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        res.json({
            success: true,
            data: world
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch world',
            error: error.message
        });
    }
});

// API: Create world
router.post('/worlds', async (req, res) => {
    try {
        const world = new World(req.body);
        await world.save();
        
        res.status(201).json({
            success: true,
            data: world,
            message: 'World created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create world',
            error: error.message
        });
    }
});

// API: Update world
router.put('/worlds/:id', async (req, res) => {
    try {
        const world = await World.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        res.json({
            success: true,
            data: world,
            message: 'World updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update world',
            error: error.message
        });
    }
});

// API: Delete world
router.delete('/worlds/:id', async (req, res) => {
    try {
        const world = await World.findByIdAndDelete(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        res.json({
            success: true,
            message: 'World deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete world',
            error: error.message
        });
    }
});

// API: Get world statistics
router.get('/stats', async (req, res) => {
    try {
        const totalWorlds = await World.countDocuments({ isPublic: true });
        const totalUsers = await User.countDocuments();
        const worldsByType = await World.aggregate([
            { $match: { isPublic: true } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalWorlds,
                totalUsers,
                worldsByType
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
});

module.exports = router;
