/**
 * AI Routes Module for My World App
 * 
 * This module handles all AI-powered API endpoints including:
 * - World enhancement with AI
 * - Character generation
 * - Story creation
 * - Magic system generation
 * - Timeline generation
 * - Image prompt generation
 * 
 * @author: AI Assistant
 * @version: 1.0.0
 */

const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const World = require('../models/World');

// ===== AI ENHANCEMENT ROUTES =====

/**
 * POST /ai/enhance-world/:id
 * Enhance an existing world with AI-generated content
 * 
 * Request body:
 * {
 *   "features": ["description", "geography", "characters", "stories", "magic", "timeline"],
 *   "options": {
 *     "characterCount": 3,
 *     "storyCount": 2,
 *     "timelineCount": 5
 *   }
 * }
 */
router.post('/enhance-world/:id', async (req, res) => {
    try {
        const worldId = req.params.id;
        const { features = ['description', 'geography', 'characters', 'stories'], options = {} } = req.body;

        // Find the world
        const world = await World.findById(worldId);
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        // Validate features
        const validFeatures = ['description', 'geography', 'characters', 'stories', 'magic', 'timeline'];
        const requestedFeatures = features.filter(f => validFeatures.includes(f));
        
        if (requestedFeatures.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid features specified'
            });
        }

        console.log(`Enhancing world "${world.name}" with features: ${requestedFeatures.join(', ')}`);

        // Enhance the world with AI
        const enhancedData = await aiService.enhanceWorld(world.toObject(), requestedFeatures);

        // Update the world with enhanced data
        const updatedWorld = await World.findByIdAndUpdate(
            worldId,
            enhancedData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: `World enhanced with ${requestedFeatures.length} AI features`,
            data: {
                world: updatedWorld,
                enhancedFeatures: requestedFeatures,
                aiMetadata: updatedWorld.aiMetadata
            }
        });

    } catch (error) {
        console.error('Error enhancing world:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to enhance world',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-description
 * Generate an enhanced world description
 * 
 * Request body:
 * {
 *   "name": "World Name",
 *   "type": "fantasy",
 *   "description": "Basic description",
 *   "geography": { "climate": "temperate" },
 *   "technology": { "level": "medieval" }
 * }
 */
router.post('/generate-description', async (req, res) => {
    try {
        const worldData = req.body;

        // Validate required fields
        if (!worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World name and type are required'
            });
        }

        console.log(`Generating description for world: ${worldData.name}`);

        // Generate enhanced description
        const enhancedDescription = await aiService.generateWorldDescription(worldData);

        res.json({
            success: true,
            message: 'Description generated successfully',
            data: {
                originalDescription: worldData.description,
                enhancedDescription: enhancedDescription
            }
        });

    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate description',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-characters
 * Generate characters for a world
 * 
 * Request body:
 * {
 *   "worldData": { ... },
 *   "count": 3
 * }
 */
router.post('/generate-characters', async (req, res) => {
    try {
        const { worldData, count = 3 } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating ${count} characters for world: ${worldData.name}`);

        // Generate characters
        const characters = await aiService.generateCharacters(worldData, count);

        res.json({
            success: true,
            message: `${characters.length} characters generated successfully`,
            data: {
                characters: characters,
                count: characters.length
            }
        });

    } catch (error) {
        console.error('Error generating characters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate characters',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-stories
 * Generate stories/adventures for a world
 * 
 * Request body:
 * {
 *   "worldData": { ... },
 *   "characters": [ ... ],
 *   "count": 2
 * }
 */
router.post('/generate-stories', async (req, res) => {
    try {
        const { worldData, characters = [], count = 2 } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating ${count} stories for world: ${worldData.name}`);

        // Generate stories
        const stories = await aiService.generateStories(worldData, characters, count);

        res.json({
            success: true,
            message: `${stories.length} stories generated successfully`,
            data: {
                stories: stories,
                count: stories.length
            }
        });

    } catch (error) {
        console.error('Error generating stories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate stories',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-magic
 * Generate a magic system for a world
 * 
 * Request body:
 * {
 *   "worldData": { ... }
 * }
 */
router.post('/generate-magic', async (req, res) => {
    try {
        const { worldData } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating magic system for world: ${worldData.name}`);

        // Generate magic system
        const magicSystem = await aiService.generateMagicSystem(worldData);

        res.json({
            success: true,
            message: 'Magic system generated successfully',
            data: {
                magicSystem: magicSystem
            }
        });

    } catch (error) {
        console.error('Error generating magic system:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate magic system',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-timeline
 * Generate timeline events for a world
 * 
 * Request body:
 * {
 *   "worldData": { ... },
 *   "count": 5
 * }
 */
router.post('/generate-timeline', async (req, res) => {
    try {
        const { worldData, count = 5 } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating ${count} timeline events for world: ${worldData.name}`);

        // Generate timeline
        const timeline = await aiService.generateTimeline(worldData, count);

        res.json({
            success: true,
            message: `${timeline.length} timeline events generated successfully`,
            data: {
                timeline: timeline,
                count: timeline.length
            }
        });

    } catch (error) {
        console.error('Error generating timeline:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate timeline',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-geography
 * Generate detailed geography for a world
 * 
 * Request body:
 * {
 *   "worldData": { ... }
 * }
 */
router.post('/generate-geography', async (req, res) => {
    try {
        const { worldData } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating geography for world: ${worldData.name}`);

        // Generate geography
        const geography = await aiService.generateGeography(worldData);

        res.json({
            success: true,
            message: 'Geography generated successfully',
            data: {
                geography: geography
            }
        });

    } catch (error) {
        console.error('Error generating geography:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate geography',
            error: error.message
        });
    }
});

// ===== IMAGE GENERATION ROUTES =====

/**
 * POST /ai/generate-map-prompt
 * Generate an image prompt for a world map
 * 
 * Request body:
 * {
 *   "worldData": { ... }
 * }
 */
router.post('/generate-map-prompt', async (req, res) => {
    try {
        const { worldData } = req.body;

        // Validate required fields
        if (!worldData || !worldData.name || !worldData.type) {
            return res.status(400).json({
                success: false,
                message: 'World data with name and type is required'
            });
        }

        console.log(`Generating map prompt for world: ${worldData.name}`);

        // Generate map prompt
        const mapPrompt = await aiService.generateMapPrompt(worldData);

        res.json({
            success: true,
            message: 'Map prompt generated successfully',
            data: {
                mapPrompt: mapPrompt,
                worldName: worldData.name,
                worldType: worldData.type
            }
        });

    } catch (error) {
        console.error('Error generating map prompt:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate map prompt',
            error: error.message
        });
    }
});

/**
 * POST /ai/generate-character-portrait-prompt
 * Generate an image prompt for a character portrait
 * 
 * Request body:
 * {
 *   "character": { ... },
 *   "worldData": { ... }
 * }
 */
router.post('/generate-character-portrait-prompt', async (req, res) => {
    try {
        const { character, worldData } = req.body;

        // Validate required fields
        if (!character || !character.name || !worldData || !worldData.name) {
            return res.status(400).json({
                success: false,
                message: 'Character and world data are required'
            });
        }

        console.log(`Generating portrait prompt for character: ${character.name}`);

        // Generate character portrait prompt
        const portraitPrompt = await aiService.generateCharacterPortraitPrompt(character, worldData);

        res.json({
            success: true,
            message: 'Character portrait prompt generated successfully',
            data: {
                portraitPrompt: portraitPrompt,
                characterName: character.name,
                worldName: worldData.name
            }
        });

    } catch (error) {
        console.error('Error generating character portrait prompt:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate character portrait prompt',
            error: error.message
        });
    }
});

// ===== AI ANALYTICS ROUTES =====

/**
 * GET /ai/stats
 * Get AI usage statistics
 */
router.get('/stats', async (req, res) => {
    try {
        // Get worlds with AI content
        const worldsWithAI = await World.find({
            'aiMetadata.enhancementCount': { $gt: 0 }
        });

        // Calculate statistics
        const totalWorlds = await World.countDocuments();
        const worldsWithAICount = worldsWithAI.length;
        const aiEnhancementRate = totalWorlds > 0 ? (worldsWithAICount / totalWorlds * 100).toFixed(1) : 0;

        // Get most used AI features
        const featureCounts = {};
        worldsWithAI.forEach(world => {
            world.aiMetadata.aiFeatures.forEach(feature => {
                featureCounts[feature] = (featureCounts[feature] || 0) + 1;
            });
        });

        const mostUsedFeatures = Object.entries(featureCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([feature, count]) => ({ feature, count }));

        res.json({
            success: true,
            data: {
                totalWorlds,
                worldsWithAI: worldsWithAICount,
                aiEnhancementRate: `${aiEnhancementRate}%`,
                mostUsedFeatures,
                recentEnhancements: worldsWithAI
                    .sort((a, b) => b.aiMetadata.lastEnhanced - a.aiMetadata.lastEnhanced)
                    .slice(0, 5)
                    .map(world => ({
                        name: world.name,
                        lastEnhanced: world.aiMetadata.lastEnhanced,
                        enhancementCount: world.aiMetadata.enhancementCount
                    }))
            }
        });

    } catch (error) {
        console.error('Error getting AI stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get AI statistics',
            error: error.message
        });
    }
});

/**
 * GET /ai/worlds/:id/ai-content
 * Get AI-generated content for a specific world
 */
router.get('/worlds/:id/ai-content', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        // Extract AI-generated content
        const aiContent = {
            hasAiContent: world.hasAiContent,
            aiMetadata: world.aiMetadata,
            aiFeatures: world.aiMetadata?.aiFeatures || [],
            characters: world.characters?.filter(c => c.aiGenerated) || [],
            stories: world.stories?.filter(s => s.aiGenerated) || [],
            timeline: world.timeline?.filter(t => t.aiGenerated) || [],
            landmarks: world.geography?.landmarks?.filter(l => l.aiGenerated) || [],
            spells: world.magic?.spells?.filter(s => s.aiGenerated) || [],
            inventions: world.technology?.inventions?.filter(i => i.aiGenerated) || []
        };

        res.json({
            success: true,
            data: {
                worldName: world.name,
                aiContent: aiContent
            }
        });

    } catch (error) {
        console.error('Error getting AI content:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get AI content',
            error: error.message
        });
    }
});

// ===== ERROR HANDLING MIDDLEWARE =====

// Handle OpenAI API errors specifically
router.use((error, req, res, next) => {
    if (error.message.includes('OpenAI') || error.message.includes('API key')) {
        return res.status(500).json({
            success: false,
            message: 'AI service is currently unavailable. Please check your API configuration.',
            error: 'AI service error'
        });
    }
    next(error);
});

module.exports = router; 