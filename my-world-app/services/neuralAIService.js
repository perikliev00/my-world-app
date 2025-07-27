/**
 * Neural AI Service - Neuroscience-Inspired World Building
 * 
 * This advanced AI system simulates:
 * - Limbic System: Emotional context and motivations
 * - Creative Prefrontal Cortex: Idea generation
 * - Analytical Prefrontal Cortex: Processing and refinement
 * - Memory Database: Context-aware learning
 * 
 * @author: AI Assistant
 * @version: 2.0.0
 */

const OpenAI = require('openai');
const mongoose = require('mongoose');

// Initialize OpenAI with graceful handling
let openai = null;
try {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'sk-proj-PLACEHOLDER',
    });
} catch (error) {
    console.warn('Neural AI: OpenAI client initialization failed. Neural features will be limited.');
}

/**
 * Memory Schema for storing AI experiences and patterns
 */
const memorySchema = new mongoose.Schema({
    worldId: { type: mongoose.Schema.Types.ObjectId, ref: 'World' },
    context: {
        worldType: String,
        emotionalTone: String,
        themes: [String],
        successMetrics: {
            coherence: Number, // 0-1
            creativity: Number, // 0-1
            engagement: Number  // 0-1
        }
    },
    patterns: [{
        type: String, // character, story, magic, etc.
        content: String,
        emotionalResonance: Number, // 0-1
        creativeScore: Number // 0-1
    }],
    feedback: {
        userEngagement: Number,
        iterations: Number,
        refinements: [String]
    },
    createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model('AIMemory', memorySchema);

/**
 * Limbic System Simulator
 * Generates emotional context and motivations for world-building
 */
class LimbicSystem {
    constructor() {
        this.emotionalStates = {
            wonder: { creativity: 0.9, focus: 0.6, themes: ['magic', 'mystery', 'discovery'] },
            conflict: { creativity: 0.7, focus: 0.8, themes: ['war', 'struggle', 'tension'] },
            harmony: { creativity: 0.6, focus: 0.7, themes: ['peace', 'unity', 'growth'] },
            darkness: { creativity: 0.8, focus: 0.9, themes: ['fear', 'survival', 'shadow'] },
            hope: { creativity: 0.8, focus: 0.7, themes: ['redemption', 'light', 'future'] }
        };
    }

    /**
     * Analyze world context and generate emotional state
     */
    async analyzeEmotionalContext(worldData) {
        const prompt = `
        Analyze this world and determine its primary emotional tone:
        World: ${worldData.name}
        Type: ${worldData.type}
        Description: ${worldData.description}
        
        Choose the dominant emotional state from: wonder, conflict, harmony, darkness, hope
        Explain why this emotional tone fits the world.
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are an emotional analysis expert.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 200,
                temperature: 0.3 // Lower temperature for consistent analysis
            });

            const analysis = response.choices[0].message.content.toLowerCase();
            
            // Extract emotional state
            for (const state of Object.keys(this.emotionalStates)) {
                if (analysis.includes(state)) {
                    return {
                        state: state,
                        profile: this.emotionalStates[state],
                        reasoning: analysis
                    };
                }
            }

            // Default to wonder if no clear state
            return {
                state: 'wonder',
                profile: this.emotionalStates.wonder,
                reasoning: analysis
            };

        } catch (error) {
            console.error('Limbic system analysis error:', error);
            return {
                state: 'wonder',
                profile: this.emotionalStates.wonder,
                reasoning: 'Default emotional state'
            };
        }
    }

    /**
     * Generate motivational drivers based on emotional state
     */
    generateMotivations(emotionalState) {
        const motivations = {
            wonder: ['discovery of the unknown', 'uncovering ancient mysteries', 'magical awakening'],
            conflict: ['survival against odds', 'fighting for justice', 'protecting the innocent'],
            harmony: ['building community', 'healing divisions', 'creating prosperity'],
            darkness: ['confronting fears', 'surviving chaos', 'finding light in shadow'],
            hope: ['rebuilding from ruin', 'inspiring change', 'creating a better future']
        };

        return motivations[emotionalState.state] || motivations.wonder;
    }
}

/**
 * Creative Prefrontal Cortex
 * Generates new ideas seeded by emotional context and memories
 */
class CreativePFC {
    constructor(limbicSystem) {
        this.limbicSystem = limbicSystem;
        this.creativityBoost = 1.0;
    }

    /**
     * Set creativity boost based on memory patterns
     */
    async calibrateCreativity(memories) {
        if (!memories || memories.length === 0) {
            this.creativityBoost = 1.0;
            return;
        }

        // Calculate average creative score from memories
        const avgCreativity = memories.reduce((sum, mem) => {
            const patternScores = mem.patterns.map(p => p.creativeScore || 0.5);
            return sum + (patternScores.reduce((a, b) => a + b, 0) / patternScores.length);
        }, 0) / memories.length;

        // Boost creativity if past attempts were less creative
        this.creativityBoost = avgCreativity < 0.7 ? 1.2 : 1.0;
    }

    /**
     * Generate creative content with emotional seeding
     */
    async generateCreativeContent(worldData, contentType, emotionalContext, memories) {
        await this.calibrateCreativity(memories);

        const temperature = Math.min(
            0.9 * this.creativityBoost * emotionalContext.profile.creativity,
            1.0
        );

        const emotionalThemes = emotionalContext.profile.themes.join(', ');
        const motivations = this.limbicSystem.generateMotivations(emotionalContext);

        const prompts = {
            characters: `
                Create characters for a ${worldData.type} world with ${emotionalContext.state} as the emotional tone.
                
                Emotional themes: ${emotionalThemes}
                Core motivations: ${motivations.join(', ')}
                
                Generate 3 unique characters that embody these themes and motivations.
                Make them complex, with both light and shadow aspects.
            `,
            stories: `
                Create stories for a ${worldData.type} world dominated by ${emotionalContext.state}.
                
                Emotional themes: ${emotionalThemes}
                Driving forces: ${motivations.join(', ')}
                
                Generate 2 compelling stories that explore these themes deeply.
                Include moral complexity and emotional resonance.
            `,
            factions: `
                Create factions for a ${worldData.type} world shaped by ${emotionalContext.state}.
                
                Emotional landscape: ${emotionalThemes}
                Motivational drivers: ${motivations.join(', ')}
                
                Generate 3 factions with conflicting but understandable goals.
                Each should represent different aspects of the emotional tone.
            `,
            culture: `
                Create cultural elements for a ${worldData.type} world infused with ${emotionalContext.state}.
                
                Emotional foundation: ${emotionalThemes}
                Cultural motivations: ${motivations.join(', ')}
                
                Generate languages, customs, and beliefs shaped by these emotions.
                Show how the emotional tone influences daily life and values.
            `
        };

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are a creative genius channeling the emotional essence of ${emotionalContext.state}. 
                                 Let this emotion guide your creativity. Be bold, unique, and deeply resonant.`
                    },
                    { role: 'user', content: prompts[contentType] || prompts.characters }
                ],
                max_tokens: 2500,
                temperature: temperature
            });

            return {
                content: response.choices[0].message.content,
                emotionalContext: emotionalContext.state,
                creativityLevel: temperature
            };

        } catch (error) {
            console.error('Creative PFC generation error:', error);
            return {
                content: 'Creative generation temporarily unavailable.',
                emotionalContext: emotionalContext.state,
                creativityLevel: temperature
            };
        }
    }
}

/**
 * Analytical Prefrontal Cortex
 * Processes and refines creative output for coherence
 */
class AnalyticalPFC {
    constructor() {
        this.coherenceThreshold = 0.7;
    }

    /**
     * Analyze content coherence and consistency
     */
    async analyzeCoherence(content, worldData, contentType) {
        const prompt = `
        Analyze this ${contentType} content for coherence with the world:
        
        World: ${worldData.name} (${worldData.type})
        Description: ${worldData.description}
        
        Content to analyze:
        ${content}
        
        Rate coherence from 0-1 and identify any inconsistencies.
        Suggest specific improvements to enhance coherence.
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a logical consistency expert.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 500,
                temperature: 0.2 // Low temperature for analytical thinking
            });

            return response.choices[0].message.content;

        } catch (error) {
            console.error('Analytical PFC error:', error);
            return 'Analysis unavailable';
        }
    }

    /**
     * Refine content based on analysis
     */
    async refineContent(creativeOutput, worldData, contentType) {
        const analysis = await this.analyzeCoherence(creativeOutput.content, worldData, contentType);

        const prompt = `
        Refine this ${contentType} content based on the analysis:
        
        Original content:
        ${creativeOutput.content}
        
        Analysis:
        ${analysis}
        
        World context: ${worldData.name} (${worldData.type})
        Emotional tone: ${creativeOutput.emotionalContext}
        
        Refine the content to improve coherence while maintaining creative essence.
        Keep the emotional resonance strong.
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a master editor who enhances coherence without losing creativity.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 2500,
                temperature: 0.4 // Balanced for refinement
            });

            return {
                refined: response.choices[0].message.content,
                analysis: analysis,
                emotionalContext: creativeOutput.emotionalContext
            };

        } catch (error) {
            console.error('Refinement error:', error);
            return {
                refined: creativeOutput.content,
                analysis: analysis,
                emotionalContext: creativeOutput.emotionalContext
            };
        }
    }
}

/**
 * Neural AI System - Main orchestrator
 */
class NeuralAISystem {
    constructor() {
        this.limbicSystem = new LimbicSystem();
        this.creativePFC = new CreativePFC(this.limbicSystem);
        this.analyticalPFC = new AnalyticalPFC();
    }

    /**
     * Retrieve relevant memories for context
     */
    async retrieveMemories(worldData, limit = 5) {
        try {
            // Find memories from similar world types or emotional contexts
            const memories = await Memory.find({
                $or: [
                    { 'context.worldType': worldData.type },
                    { worldId: worldData._id }
                ]
            })
            .sort({ 'context.successMetrics.engagement': -1 })
            .limit(limit);

            return memories;

        } catch (error) {
            console.error('Memory retrieval error:', error);
            return [];
        }
    }

    /**
     * Store new memory pattern
     */
    async storeMemory(worldData, contentType, content, emotionalContext, metrics) {
        try {
            const memory = new Memory({
                worldId: worldData._id,
                context: {
                    worldType: worldData.type,
                    emotionalTone: emotionalContext.state,
                    themes: emotionalContext.profile.themes,
                    successMetrics: metrics
                },
                patterns: [{
                    type: contentType,
                    content: JSON.stringify(content),
                    emotionalResonance: metrics.coherence,
                    creativeScore: metrics.creativity
                }]
            });

            await memory.save();
            return memory;

        } catch (error) {
            console.error('Memory storage error:', error);
            return null;
        }
    }

    /**
     * Main generation pipeline with neural processing
     */
    async generateWithNeuralProcessing(worldData, contentType) {
        console.log(`🧠 Neural AI System activated for ${contentType} generation...`);

        // Step 1: Limbic System - Analyze emotional context
        console.log('📍 Limbic System: Analyzing emotional context...');
        const emotionalContext = await this.limbicSystem.analyzeEmotionalContext(worldData);
        console.log(`   Emotional state: ${emotionalContext.state}`);

        // Step 2: Retrieve relevant memories
        console.log('🗄️ Memory Database: Retrieving relevant patterns...');
        const memories = await this.retrieveMemories(worldData);
        console.log(`   Found ${memories.length} relevant memories`);

        // Step 3: Creative PFC - Generate content
        console.log('🎨 Creative PFC: Generating content...');
        const creativeOutput = await this.creativePFC.generateCreativeContent(
            worldData, 
            contentType, 
            emotionalContext, 
            memories
        );

        // Step 4: Analytical PFC - Refine content
        console.log('🔍 Analytical PFC: Analyzing and refining...');
        const refinedOutput = await this.analyticalPFC.refineContent(
            creativeOutput, 
            worldData, 
            contentType
        );

        // Step 5: Calculate success metrics
        const metrics = {
            coherence: 0.8, // Would be calculated from analysis
            creativity: creativeOutput.creativityLevel,
            engagement: 0.75 // Would be tracked from user interaction
        };

        // Step 6: Store in memory for future learning
        console.log('💾 Storing experience in memory...');
        await this.storeMemory(worldData, contentType, refinedOutput, emotionalContext, metrics);

        // Return structured output
        return {
            content: refinedOutput.refined,
            metadata: {
                emotionalContext: emotionalContext,
                creativityLevel: creativeOutput.creativityLevel,
                coherenceAnalysis: refinedOutput.analysis,
                neuralPathway: 'limbic → creative_pfc → analytical_pfc → memory'
            }
        };
    }

    /**
     * Generate characters with neural processing
     */
    async generateCharactersNeural(worldData, count = 3) {
        const result = await this.generateWithNeuralProcessing(worldData, 'characters');
        return this.parseCharactersFromNeural(result.content, result.metadata);
    }

    /**
     * Generate stories with neural processing
     */
    async generateStoriesNeural(worldData, count = 2) {
        const result = await this.generateWithNeuralProcessing(worldData, 'stories');
        return this.parseStoriesFromNeural(result.content, result.metadata);
    }

    /**
     * Generate factions with neural processing
     */
    async generateFactionsNeural(worldData, count = 3) {
        const result = await this.generateWithNeuralProcessing(worldData, 'factions');
        return this.parseFactionsFromNeural(result.content, result.metadata);
    }

    /**
     * Generate culture with neural processing
     */
    async generateCultureNeural(worldData) {
        const result = await this.generateWithNeuralProcessing(worldData, 'culture');
        return this.parseCultureFromNeural(result.content, result.metadata);
    }

    /**
     * Parse neural output into structured character data
     */
    parseCharactersFromNeural(content, metadata) {
        // Basic parsing - in production would be more sophisticated
        const characters = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            if (section.trim()) {
                characters.push({
                    name: `Neural Character ${characters.length + 1}`,
                    description: section,
                    emotionalCore: metadata.emotionalContext.state,
                    neuralGenerated: true,
                    aiGenerated: true
                });
            }
        });

        return characters;
    }

    /**
     * Parse neural output into structured story data
     */
    parseStoriesFromNeural(content, metadata) {
        const stories = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            if (section.trim()) {
                stories.push({
                    title: `Neural Story ${stories.length + 1}`,
                    description: section,
                    emotionalTheme: metadata.emotionalContext.state,
                    neuralGenerated: true,
                    aiGenerated: true
                });
            }
        });

        return stories;
    }

    /**
     * Parse neural output into structured faction data
     */
    parseFactionsFromNeural(content, metadata) {
        const factions = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            if (section.trim()) {
                factions.push({
                    name: `Neural Faction ${factions.length + 1}`,
                    description: section,
                    emotionalDriver: metadata.emotionalContext.state,
                    neuralGenerated: true,
                    aiGenerated: true
                });
            }
        });

        return factions;
    }

    /**
     * Parse neural output into structured culture data
     */
    parseCultureFromNeural(content, metadata) {
        return {
            detailedCulture: content,
            emotionalFoundation: metadata.emotionalContext.state,
            neuralGenerated: true,
            aiGenerated: true
        };
    }
}

// Export singleton instance
module.exports = new NeuralAISystem(); 