/**
 * Neural AI Routes - Advanced Neuroscience-Inspired World Building
 * 
 * These routes expose the neural AI system that simulates:
 * - Limbic system for emotional context
 * - Dual PFC for creativity and analysis
 * - Memory database for learning
 * 
 * @author: AI Assistant
 * @version: 2.0.0
 */

const express = require('express');
const router = express.Router();
const neuralAI = require('../services/neuralAIService');
const World = require('../models/World');

/**
 * POST /neural/analyze-emotion/:id
 * Analyze the emotional context of a world
 */
router.post('/analyze-emotion/:id', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Analyzing emotional context for world: ${world.name}`);

        // Analyze emotional context
        const emotionalAnalysis = await neuralAI.limbicSystem.analyzeEmotionalContext(world.toObject());

        res.json({
            success: true,
            message: 'Emotional analysis complete',
            data: {
                worldName: world.name,
                emotionalState: emotionalAnalysis.state,
                emotionalProfile: emotionalAnalysis.profile,
                reasoning: emotionalAnalysis.reasoning,
                motivations: neuralAI.limbicSystem.generateMotivations(emotionalAnalysis)
            }
        });

    } catch (error) {
        console.error('Error in emotional analysis:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze emotional context',
            error: error.message
        });
    }
});

/**
 * POST /neural/generate-characters/:id
 * Generate characters using neural AI processing
 */
router.post('/generate-characters/:id', async (req, res) => {
    try {
        const { count = 3 } = req.body;
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Neural character generation for world: ${world.name}`);

        // Generate characters with neural processing
        const characters = await neuralAI.generateCharactersNeural(world.toObject(), count);

        // Update world with new characters
        world.characters = [...(world.characters || []), ...characters];
        await world.save();

        res.json({
            success: true,
            message: 'Neural characters generated successfully',
            data: {
                characters: characters,
                count: characters.length,
                neuralProcess: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        });

    } catch (error) {
        console.error('Error generating neural characters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate neural characters',
            error: error.message
        });
    }
});

/**
 * POST /neural/generate-stories/:id
 * Generate stories using neural AI processing
 */
router.post('/generate-stories/:id', async (req, res) => {
    try {
        const { count = 2 } = req.body;
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Neural story generation for world: ${world.name}`);

        // Generate stories with neural processing
        const stories = await neuralAI.generateStoriesNeural(world.toObject(), count);

        // Update world with new stories
        world.stories = [...(world.stories || []), ...stories];
        await world.save();

        res.json({
            success: true,
            message: 'Neural stories generated successfully',
            data: {
                stories: stories,
                count: stories.length,
                neuralProcess: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        });

    } catch (error) {
        console.error('Error generating neural stories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate neural stories',
            error: error.message
        });
    }
});

/**
 * POST /neural/generate-factions/:id
 * Generate factions using neural AI processing
 */
router.post('/generate-factions/:id', async (req, res) => {
    try {
        const { count = 3 } = req.body;
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Neural faction generation for world: ${world.name}`);

        // Generate factions with neural processing
        const factions = await neuralAI.generateFactionsNeural(world.toObject(), count);

        // Update world with new factions
        if (!world.culture) world.culture = {};
        world.culture.factions = [...(world.culture.factions || []), ...factions];
        await world.save();

        res.json({
            success: true,
            message: 'Neural factions generated successfully',
            data: {
                factions: factions,
                count: factions.length,
                neuralProcess: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        });

    } catch (error) {
        console.error('Error generating neural factions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate neural factions',
            error: error.message
        });
    }
});

/**
 * POST /neural/generate-culture/:id
 * Generate culture using neural AI processing
 */
router.post('/generate-culture/:id', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Neural culture generation for world: ${world.name}`);

        // Generate culture with neural processing
        const culture = await neuralAI.generateCultureNeural(world.toObject());

        // Update world with enhanced culture
        if (!world.culture) world.culture = {};
        world.culture.detailedCulture = culture.detailedCulture;
        world.culture.emotionalFoundation = culture.emotionalFoundation;
        await world.save();

        res.json({
            success: true,
            message: 'Neural culture generated successfully',
            data: {
                culture: culture,
                neuralProcess: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        });

    } catch (error) {
        console.error('Error generating neural culture:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate neural culture',
            error: error.message
        });
    }
});

/**
 * POST /neural/full-enhancement/:id
 * Perform full neural enhancement on a world
 */
router.post('/full-enhancement/:id', async (req, res) => {
    try {
        const world = await World.findById(req.params.id);
        
        if (!world) {
            return res.status(404).json({
                success: false,
                message: 'World not found'
            });
        }

        console.log(`🧠 Full neural enhancement for world: ${world.name}`);

        // Perform all neural enhancements
        const results = {
            emotionalAnalysis: await neuralAI.limbicSystem.analyzeEmotionalContext(world.toObject()),
            characters: await neuralAI.generateCharactersNeural(world.toObject(), 3),
            stories: await neuralAI.generateStoriesNeural(world.toObject(), 2),
            factions: await neuralAI.generateFactionsNeural(world.toObject(), 3),
            culture: await neuralAI.generateCultureNeural(world.toObject())
        };

        // Update world with all enhancements
        world.characters = [...(world.characters || []), ...results.characters];
        world.stories = [...(world.stories || []), ...results.stories];
        
        if (!world.culture) world.culture = {};
        world.culture.factions = [...(world.culture.factions || []), ...results.factions];
        world.culture.detailedCulture = results.culture.detailedCulture;
        world.culture.emotionalFoundation = results.culture.emotionalFoundation;

        // Update AI metadata
        if (!world.aiMetadata) world.aiMetadata = {};
        world.aiMetadata.lastEnhanced = new Date();
        world.aiMetadata.enhancementCount = (world.aiMetadata.enhancementCount || 0) + 1;
        world.aiMetadata.neuralEnhanced = true;
        world.aiMetadata.emotionalProfile = results.emotionalAnalysis;

        await world.save();

        res.json({
            success: true,
            message: 'Full neural enhancement complete',
            data: {
                worldName: world.name,
                emotionalState: results.emotionalAnalysis.state,
                enhancementsApplied: {
                    characters: results.characters.length,
                    stories: results.stories.length,
                    factions: results.factions.length,
                    culture: true
                },
                neuralProcess: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        });

    } catch (error) {
        console.error('Error in full neural enhancement:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to complete neural enhancement',
            error: error.message
        });
    }
});

/**
 * GET /neural/memories/:worldId
 * Get AI memories for a specific world
 */
router.get('/memories/:worldId', async (req, res) => {
    try {
        const memories = await neuralAI.retrieveMemories({ _id: req.params.worldId }, 10);

        res.json({
            success: true,
            data: {
                memories: memories,
                count: memories.length
            }
        });

    } catch (error) {
        console.error('Error retrieving memories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve memories',
            error: error.message
        });
    }
});

/**
 * GET /neural/status
 * Get neural AI system status
 */
router.get('/status', async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                status: 'operational',
                components: {
                    limbicSystem: 'active',
                    creativePFC: 'active',
                    analyticalPFC: 'active',
                    memoryDatabase: 'connected'
                },
                emotionalStates: Object.keys(neuralAI.limbicSystem.emotionalStates),
                features: [
                    'emotional_analysis',
                    'neural_characters',
                    'neural_stories',
                    'neural_factions',
                    'neural_culture',
                    'memory_learning'
                ]
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get neural AI status',
            error: error.message
        });
    }
});

module.exports = router; 