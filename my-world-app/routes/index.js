const express = require('express');
const router = express.Router();
const World = require('../models/World');

// Home page
router.get('/', async (req, res) => {
    try {
        const recentWorlds = await World.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .limit(6);
        
        const stats = {
            totalWorlds: await World.countDocuments({ isPublic: true }),
            totalCreators: await World.distinct('creator').length
        };

        res.render('index', {
            title: 'My World App - Create and Explore Worlds',
            recentWorlds,
            stats
        });
    } catch (error) {
        console.error(error);
        res.render('index', {
            title: 'My World App - Create and Explore Worlds',
            recentWorlds: [],
            stats: { totalWorlds: 0, totalCreators: 0 }
        });
    }
});

// About page
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About - My World App'
    });
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact - My World App'
    });
});

module.exports = router;
