const express = require('express');
const router = express.Router();
const World = require('../models/World');

// Display all public worlds
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;
        
        const filter = { isPublic: true };
        
        // Add search functionality
        if (req.query.search) {
            filter.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { tags: { $in: [new RegExp(req.query.search, 'i')] } }
            ];
        }
        
        // Add type filter
        if (req.query.type && req.query.type !== 'all') {
            filter.type = req.query.type;
        }

        const worlds = await World.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const totalWorlds = await World.countDocuments(filter);
        const totalPages = Math.ceil(totalWorlds / limit);

        res.render('world/index', {
            title: 'Explore Worlds',
            worlds,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            search: req.query.search || '',
            selectedType: req.query.type || 'all'
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to load worlds'
        });
    }
});

// Show form to create new world
router.get('/new', (req, res) => {
    res.render('world/new', {
        title: 'Create New World'
    });
});

// Create new world
router.post('/', async (req, res) => {
    try {
        const worldData = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            creator: req.body.creator || 'Anonymous',
            isPublic: req.body.isPublic === 'on',
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        };

        // Add optional fields if provided
        if (req.body.population) {
            worldData.population = parseInt(req.body.population);
        }
        
        if (req.body.climate) {
            worldData.geography = { climate: req.body.climate };
        }

        const world = new World(worldData);
        await world.save();
        
        res.redirect(`/world/${world._id}`);
    } catch (error) {
        console.error(error);
        res.render('world/new', {
            title: 'Create New World',
            error: 'Failed to create world. Please try again.',
            formData: req.body
        });
    }
});

// Show specific world
router.get('/:id', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).render('404', {
                title: 'World Not Found',
                message: 'The world you are looking for does not exist.'
            });
        }

        res.render('world/show', {
            title: world.name,
            world
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to load world'
        });
    }
});

// Show neural AI enhancement interface
router.get('/:id/neural', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).render('404', {
                title: 'World Not Found',
                message: 'The world you are looking for does not exist.'
            });
        }

        res.render('world/neural-enhance', {
            title: `${world.name} - Neural AI Enhancement`,
            world
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to load neural interface'
        });
    }
});

// Show AI-enhanced world view
router.get('/:id/ai', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).render('404', {
                title: 'World Not Found',
                message: 'The world you are looking for does not exist.'
            });
        }

        res.render('world/show-ai', {
            title: `${world.name} - AI Enhanced`,
            world
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to load world'
        });
    }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).render('404', {
                title: 'World Not Found',
                message: 'The world you are looking for does not exist.'
            });
        }

        res.render('world/edit', {
            title: `Edit ${world.name}`,
            world
        });
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to load world for editing'
        });
    }
});

// Update world
router.put('/:id', async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            isPublic: req.body.isPublic === 'on',
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        };

        if (req.body.population) {
            updateData.population = parseInt(req.body.population);
        }

        const world = await World.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!world) {
            return res.status(404).render('404', {
                title: 'World Not Found',
                message: 'The world you are looking for does not exist.'
            });
        }

        res.redirect(`/world/${world._id}`);
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Error',
            message: 'Failed to update world'
        });
    }
});

// Delete world
router.delete('/:id', async (req, res) => {
    try {
        const world = await World.findByIdAndDelete(req.params.id);
        
        if (!world) {
            return res.status(404).json({ error: 'World not found' });
        }

        res.redirect('/world');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete world' });
    }
});

module.exports = router;
