/**
 * AI Service Module for My World App
 * 
 * This module handles all AI-powered features including:
 * - OpenAI GPT-4 integration for text generation
 * - Image generation for maps and characters
 * - World enhancement features
 * - Character and story generation
 * 
 * @author: AI Assistant
 * @version: 1.0.0
 */

const OpenAI = require('openai');
const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// Initialize OpenAI client with graceful handling
let openai = null;
try {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'sk-proj-PLACEHOLDER',
    });
} catch (error) {
    console.warn('OpenAI client initialization failed. AI features will be limited.');
}

/**
 * AI Service Class
 * Handles all AI-related operations for world building
 */
class AIService {
    constructor() {
        this.model = 'gpt-4'; // Using GPT-4 for best quality
        this.maxTokens = 2000; // Reasonable limit for responses
        this.temperature = 0.8; // Creative but not too random
    }

    /**
     * Generate enhanced world description using AI
     * @param {Object} worldData - Basic world information
     * @returns {Promise<string>} Enhanced description
     */
    async generateWorldDescription(worldData) {
        try {
            if (!openai) {
                console.warn('OpenAI client not initialized');
                return 'AI service is not available. Please configure your OpenAI API key.';
            }
            
            const prompt = this.buildWorldDescriptionPrompt(worldData);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert world-building assistant. Create rich, detailed, and engaging descriptions that bring worlds to life. Focus on atmosphere, unique elements, and storytelling potential.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            return response.choices[0].message.content.trim();
        } catch (error) {
            // Log error for debugging
            console.error('Error generating world description:', error);
            // Return a user-friendly message
            return 'AI could not generate a description at this time.';
        }
    }

    /**
     * Generate detailed geography for a world
     * @param {Object} worldData - World information
     * @returns {Promise<Object>} Enhanced geography data
     */
    async generateGeography(worldData) {
        try {
            const prompt = this.buildGeographyPrompt(worldData);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are a geography expert specializing in fictional worlds. Create detailed, coherent geography that fits the world's theme and type.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            const content = response.choices[0].message.content.trim();
            
            // Parse the response to extract structured data
            return this.parseGeographyResponse(content, worldData);
        } catch (error) {
            console.error('Error generating geography:', error);
            return { detailedGeography: 'AI could not generate geography at this time.', landmarks: [] };
        }
    }

    /**
     * Generate characters for a world
     * @param {Object} worldData - World information
     * @param {number} count - Number of characters to generate
     * @returns {Promise<Array>} Generated characters
     */
    async generateCharacters(worldData, count = 3) {
        try {
            const prompt = this.buildCharacterPrompt(worldData, count);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are a character creation expert. Create compelling, well-rounded characters that fit the world's theme and have interesting backstories and motivations.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            const content = response.choices[0].message.content.trim();
            return this.parseCharacterResponse(content);
        } catch (error) {
            console.error('Error generating characters:', error);
            return [{ name: 'AI Character', role: 'npc', description: 'AI could not generate characters at this time.', aiGenerated: true }];
        }
    }

    /**
     * Generate stories/adventures for a world
     * @param {Object} worldData - World information
     * @param {Array} characters - Existing characters
     * @param {number} count - Number of stories to generate
     * @returns {Promise<Array>} Generated stories
     */
    async generateStories(worldData, characters = [], count = 2) {
        try {
            const prompt = this.buildStoryPrompt(worldData, characters, count);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are a storytelling expert. Create engaging adventures, quests, and stories that utilize the world's unique elements and characters.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            const content = response.choices[0].message.content.trim();
            return this.parseStoryResponse(content);
        } catch (error) {
            console.error('Error generating stories:', error);
            return [{ title: 'AI Story', type: 'adventure', description: 'AI could not generate stories at this time.', aiGenerated: true }];
        }
    }

    /**
     * Generate magic system for a world
     * @param {Object} worldData - World information
     * @returns {Promise<Object>} Generated magic system
     */
    async generateMagicSystem(worldData) {
        try {
            const prompt = this.buildMagicPrompt(worldData);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are a magic system design expert. Create balanced, interesting magic systems that enhance the world's storytelling potential.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            const content = response.choices[0].message.content.trim();
            return this.parseMagicResponse(content);
        } catch (error) {
            console.error('Error generating magic system:', error);
            return { detailedMagic: 'AI could not generate a magic system at this time.', spells: [] };
        }
    }

    /**
     * Generate timeline events for a world
     * @param {Object} worldData - World information
     * @param {number} count - Number of events to generate
     * @returns {Promise<Array>} Generated timeline events
     */
    async generateTimeline(worldData, count = 5) {
        try {
            const prompt = this.buildTimelinePrompt(worldData, count);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are a historical timeline expert. Create significant events that shaped the world's history and current state.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature
            });

            const content = response.choices[0].message.content.trim();
            return this.parseTimelineResponse(content);
        } catch (error) {
            console.error('Error generating timeline:', error);
            return [{ event: 'AI Timeline Event', date: '', description: 'AI could not generate timeline events at this time.', aiGenerated: true }];
        }
    }

    /**
     * Generate image prompt for world map
     * @param {Object} worldData - World information
     * @returns {Promise<string>} Image generation prompt
     */
    async generateMapPrompt(worldData) {
        try {
            const prompt = this.buildMapPrompt(worldData);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert at creating image generation prompts. Create detailed, artistic prompts for world maps that capture the essence of the world.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            });

            return response.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error generating map prompt:', error);
            throw new Error('Failed to generate map prompt');
        }
    }

    /**
     * Generate image prompt for character portrait
     * @param {Object} character - Character information
     * @param {Object} worldData - World information
     * @returns {Promise<string>} Image generation prompt
     */
    async generateCharacterPortraitPrompt(character, worldData) {
        try {
            const prompt = this.buildCharacterPortraitPrompt(character, worldData);
            
            const response = await openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert at creating image generation prompts for character portraits. Create detailed, artistic prompts that capture the character's appearance and personality.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            });

            return response.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error generating character portrait prompt:', error);
            throw new Error('Failed to generate character portrait prompt');
        }
    }

    /**
     * Comprehensive world enhancement - generates multiple AI features at once
     * @param {Object} worldData - World information
     * @param {Array} features - Array of features to generate
     * @returns {Promise<Object>} Enhanced world data
     */
    async enhanceWorld(worldData, features = ['description', 'geography', 'characters', 'stories']) {
        try {
            const enhancedData = { ...worldData };
            const generatedFeatures = [];

            // Generate each requested feature
            for (const feature of features) {
                try {
                    switch (feature) {
                        case 'description':
                            enhancedData.description = await this.generateWorldDescription(worldData);
                            generatedFeatures.push('description');
                            break;
                            
                        case 'geography':
                            const geography = await this.generateGeography(worldData);
                            enhancedData.geography = { ...enhancedData.geography, ...geography };
                            generatedFeatures.push('geography');
                            break;
                            
                        case 'characters':
                            enhancedData.characters = await this.generateCharacters(worldData);
                            generatedFeatures.push('characters');
                            break;
                            
                        case 'stories':
                            enhancedData.stories = await this.generateStories(worldData, enhancedData.characters || []);
                            generatedFeatures.push('stories');
                            break;
                            
                        case 'magic':
                            const magic = await this.generateMagicSystem(worldData);
                            enhancedData.magic = { ...enhancedData.magic, ...magic };
                            generatedFeatures.push('magic');
                            break;
                            
                        case 'timeline':
                            enhancedData.timeline = await this.generateTimeline(worldData);
                            generatedFeatures.push('timeline');
                            break;
                    }
                } catch (error) {
                    console.error(`Error generating ${feature}:`, error);
                    // Continue with other features even if one fails
                }
            }

            // Update AI metadata
            enhancedData.aiMetadata = {
                lastEnhanced: new Date(),
                enhancementCount: (worldData.aiMetadata?.enhancementCount || 0) + 1,
                aiFeatures: [...(worldData.aiMetadata?.aiFeatures || []), ...generatedFeatures],
                generationPrompts: [
                    ...(worldData.aiMetadata?.generationPrompts || []),
                    {
                        feature: 'comprehensive_enhancement',
                        prompt: `Enhanced world with features: ${generatedFeatures.join(', ')}`,
                        timestamp: new Date()
                    }
                ]
            };

            return enhancedData;
        } catch (error) {
            console.error('Error enhancing world:', error);
            throw new Error('Failed to enhance world');
        }
    }

    // ===== PROMPT BUILDING METHODS =====

    /**
     * Build prompt for world description generation
     */
    buildWorldDescriptionPrompt(worldData) {
        return `
Create a rich, detailed description for a ${worldData.type} world called "${worldData.name}".

Current description: ${worldData.description}

Please enhance this description to be more vivid, detailed, and engaging. Include:
- The world's unique atmosphere and feel
- Key distinguishing features
- What makes this world special
- Potential for storytelling and adventure
- Cultural and environmental highlights

Make it approximately 300-500 words and focus on creating an immersive experience for readers.
        `.trim();
    }

    /**
     * Build prompt for geography generation
     */
    buildGeographyPrompt(worldData) {
        return `
Create detailed geography for a ${worldData.type} world called "${worldData.name}".

World details:
- Type: ${worldData.type}
- Climate: ${worldData.geography?.climate || 'temperate'}
- Current terrain: ${worldData.geography?.terrain?.join(', ') || 'various'}

Please provide:
1. Detailed geography description (2-3 paragraphs)
2. 3-5 major landmarks with descriptions
3. Geographic features that make this world unique
4. How geography influences the world's culture and society

Format the response as structured data that can be parsed.
        `.trim();
    }

    /**
     * Build prompt for character generation
     */
    buildCharacterPrompt(worldData, count) {
        return `
Create ${count} compelling characters for a ${worldData.type} world called "${worldData.name}".

World context:
- Type: ${worldData.type}
- Description: ${worldData.description}
- Technology level: ${worldData.technology?.level || 'medieval'}
- Magic exists: ${worldData.magic?.exists || false}

For each character, provide:
- Name
- Role (protagonist, antagonist, supporting, or npc)
- Brief description
- Backstory
- Personality traits
- Motivations
- Key relationships

Make characters diverse and interesting, with clear motivations and potential for conflict and cooperation.
        `.trim();
    }

    /**
     * Build prompt for story generation
     */
    buildStoryPrompt(worldData, characters, count) {
        const characterNames = characters.map(c => c.name).join(', ');
        
        return `
Create ${count} engaging stories/adventures for a ${worldData.type} world called "${worldData.name}".

World context:
- Type: ${worldData.type}
- Description: ${worldData.description}
- Available characters: ${characterNames || 'None specified'}

For each story, provide:
- Title
- Type (quest, adventure, mystery, or conflict)
- Brief description
- Detailed plot
- Characters involved
- Locations featured
- Potential rewards
- Difficulty level (easy, medium, hard, or epic)

Make stories that utilize the world's unique elements and create opportunities for adventure and character development.
        `.trim();
    }

    /**
     * Build prompt for magic system generation
     */
    buildMagicPrompt(worldData) {
        return `
Create a detailed magic system for a ${worldData.type} world called "${worldData.name}".

World context:
- Type: ${worldData.type}
- Description: ${worldData.description}
- Technology level: ${worldData.technology?.level || 'medieval'}

Please provide:
1. Magic system overview (2-3 paragraphs)
2. 5-8 specific spells with descriptions
3. Magic rules and limitations
4. How magic integrates with the world's society and culture

Make the magic system balanced, interesting, and integral to the world's identity.
        `.trim();
    }

    /**
     * Build prompt for timeline generation
     */
    buildTimelinePrompt(worldData, count) {
        return `
Create ${count} significant historical events for a ${worldData.type} world called "${worldData.name}".

World context:
- Type: ${worldData.type}
- Description: ${worldData.description}
- Technology level: ${worldData.technology?.level || 'medieval'}

For each event, provide:
- Event name
- Approximate date/time period
- Detailed description of what happened
- Impact on the world's current state

Create events that shaped the world's history and explain how the world got to its current state.
        `.trim();
    }

    /**
     * Build prompt for map generation
     */
    buildMapPrompt(worldData) {
        return `
Create an image generation prompt for a world map of "${worldData.name}", a ${worldData.type} world.

World details:
- Type: ${worldData.type}
- Climate: ${worldData.geography?.climate || 'temperate'}
- Terrain: ${worldData.geography?.terrain?.join(', ') || 'various'}
- Description: ${worldData.description}

Create a detailed, artistic prompt for generating a beautiful world map that captures the essence of this world. Include style, atmosphere, and key visual elements.
        `.trim();
    }

    /**
     * Build prompt for character portrait generation
     */
    buildCharacterPortraitPrompt(character, worldData) {
        return `
Create an image generation prompt for a character portrait of "${character.name}" from the ${worldData.type} world "${worldData.name}".

Character details:
- Role: ${character.role}
- Description: ${character.description}
- Personality: ${character.personality}
- World type: ${worldData.type}

Create a detailed, artistic prompt for generating a character portrait that captures their appearance, personality, and fits the world's aesthetic.
        `.trim();
    }

    // ===== RESPONSE PARSING METHODS =====

    /**
     * Parse geography response into structured data
     */
    parseGeographyResponse(content, worldData) {
        // This is a simplified parser - in production you'd want more robust parsing
        const lines = content.split('\n').filter(line => line.trim());
        
        return {
            detailedGeography: content,
            landmarks: [
                {
                    name: 'Generated Landmark 1',
                    description: 'A significant location in the world',
                    location: 'Various locations',
                    significance: 'Important to the world\'s history',
                    aiGenerated: true
                }
            ]
        };
    }

    /**
     * Parse character response into structured data
     */
    parseCharacterResponse(content) {
        // Simplified parser - in production you'd want more robust parsing
        const characters = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            const lines = section.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const name = lines[0].replace(/^[^:]*:\s*/, '');
                if (name && name.length < 50) {
                    characters.push({
                        name: name,
                        role: 'supporting',
                        description: section,
                        backstory: 'Generated backstory',
                        personality: 'Generated personality',
                        motivations: 'Generated motivations',
                        relationships: [],
                        aiGenerated: true,
                        createdAt: new Date()
                    });
                }
            }
        });

        return characters.length > 0 ? characters : [
            {
                name: 'Generated Character',
                role: 'supporting',
                description: content,
                backstory: 'Generated backstory',
                personality: 'Generated personality',
                motivations: 'Generated motivations',
                relationships: [],
                aiGenerated: true,
                createdAt: new Date()
            }
        ];
    }

    /**
     * Parse story response into structured data
     */
    parseStoryResponse(content) {
        // Simplified parser
        const stories = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            const lines = section.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const title = lines[0].replace(/^[^:]*:\s*/, '');
                if (title && title.length < 100) {
                    stories.push({
                        title: title,
                        type: 'adventure',
                        description: section,
                        plot: 'Generated plot',
                        characters: [],
                        locations: [],
                        rewards: 'Generated rewards',
                        difficulty: 'medium',
                        aiGenerated: true,
                        createdAt: new Date()
                    });
                }
            }
        });

        return stories.length > 0 ? stories : [
            {
                title: 'Generated Adventure',
                type: 'adventure',
                description: content,
                plot: 'Generated plot',
                characters: [],
                locations: [],
                rewards: 'Generated rewards',
                difficulty: 'medium',
                aiGenerated: true,
                createdAt: new Date()
            }
        ];
    }

    /**
     * Parse magic response into structured data
     */
    parseMagicResponse(content) {
        return {
            detailedMagic: content,
            spells: [
                {
                    name: 'Generated Spell',
                    description: 'A powerful magical effect',
                    requirements: 'Magic user',
                    effects: 'Various magical effects',
                    aiGenerated: true
                }
            ]
        };
    }

    /**
     * Parse timeline response into structured data
     */
    parseTimelineResponse(content) {
        const events = [];
        const sections = content.split(/\n\n+/);
        
        sections.forEach(section => {
            const lines = section.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                const eventName = lines[0].replace(/^[^:]*:\s*/, '');
                if (eventName && eventName.length < 100) {
                    events.push({
                        event: eventName,
                        date: 'Historical period',
                        description: section,
                        aiGenerated: true
                    });
                }
            }
        });

        return events.length > 0 ? events : [
            {
                event: 'Generated Historical Event',
                date: 'Historical period',
                description: content,
                aiGenerated: true
            }
        ];
    }
}

module.exports = new AIService(); 