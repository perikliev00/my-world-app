const mongoose = require('mongoose');

const worldSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['fantasy', 'sci-fi', 'modern', 'historical', 'post-apocalyptic', 'other'],
        default: 'fantasy'
    },
    creator: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        default: 0
    },

    // Enhanced Geography with AI-generated content
    geography: {
        continents: [{
            name: String,
            description: String,
            size: String,
            aiGenerated: { type: Boolean, default: false }
        }],
        climate: {
            type: String,
            default: 'temperate'
        },
        terrain: [String],
        // AI-generated detailed geography
        detailedGeography: {
            type: String,
            default: ''
        },
        landmarks: [{
            name: String,
            description: String,
            location: String,
            significance: String,
            aiGenerated: { type: Boolean, default: false }
        }]
    },

    // Enhanced Culture with AI-generated content
    culture: {
        languages: [String],
        religions: [String],
        customs: [String],
        // AI-generated detailed culture
        detailedCulture: {
            type: String,
            default: ''
        },
        societies: [{
            name: String,
            description: String,
            structure: String,
            values: [String],
            aiGenerated: { type: Boolean, default: false }
        }],
        // NEW: AI-generated factions
        factions: [{
            name: String,
            description: String,
            type: String, // kingdom, guild, cult, etc.
            goals: String,
            aiGenerated: { type: Boolean, default: false }
        }],
    },

    // Enhanced Technology with AI-generated content
    technology: {
        level: {
            type: String,
            enum: ['primitive', 'medieval', 'renaissance', 'industrial', 'modern', 'futuristic'],
            default: 'medieval'
        },
        specialFeatures: [String],
        // AI-generated detailed technology
        detailedTechnology: {
            type: String,
            default: ''
        },
        inventions: [{
            name: String,
            description: String,
            impact: String,
            aiGenerated: { type: Boolean, default: false }
        }],
        // NEW: AI-generated technology summary
        aiSummary: {
            type: String,
            default: ''
        }
    },

    // Enhanced Magic with AI-generated content
    magic: {
        exists: {
            type: Boolean,
            default: false
        },
        type: String,
        rules: [String],
        // AI-generated detailed magic system
        detailedMagic: {
            type: String,
            default: ''
        },
        spells: [{
            name: String,
            description: String,
            requirements: String,
            effects: String,
            aiGenerated: { type: Boolean, default: false }
        }]
    },

    // Enhanced Timeline with AI-generated content
    timeline: [{
        event: String,
        date: String,
        description: String,
        aiGenerated: { type: Boolean, default: false }
    }],

    // NEW: AI-Generated Characters
    characters: [{
        name: String,
        role: String, // 'protagonist', 'antagonist', 'supporting', 'npc'
        description: String,
        backstory: String,
        personality: String,
        motivations: String,
        relationships: [{
            characterName: String,
            relationshipType: String,
            description: String
        }],
        aiGenerated: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],

    // NEW: AI-Generated Stories/Adventures
    stories: [{
        title: String,
        type: String, // 'quest', 'adventure', 'mystery', 'conflict'
        description: String,
        plot: String,
        characters: [String], // character names involved
        locations: [String],
        rewards: String,
        difficulty: String, // 'easy', 'medium', 'hard', 'epic'
        aiGenerated: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],

    // NEW: AI-Generated Maps and Visual Content
    visualContent: {
        worldMap: {
            description: String,
            imagePrompt: String,
            generatedImage: String, // URL to generated image
            aiGenerated: { type: Boolean, default: false }
        },
        characterPortraits: [{
            characterName: String,
            description: String,
            imagePrompt: String,
            generatedImage: String,
            aiGenerated: { type: Boolean, default: false }
        }],
        conceptArt: [{
            title: String,
            description: String,
            imagePrompt: String,
            generatedImage: String,
            aiGenerated: { type: Boolean, default: false }
        }]
    },

    // NEW: AI Generation Metadata
    aiMetadata: {
        lastEnhanced: Date,
        enhancementCount: { type: Number, default: 0 },
        aiFeatures: [String], // List of AI features used
        generationPrompts: [{
            feature: String,
            prompt: String,
            timestamp: { type: Date, default: Date.now }
        }]
    },

    // NEW: AI-generated world summary
    aiWorldSummary: {
        type: String,
        default: ''
    },
    // NEW: AI-generated quest hooks
    questHooks: [{
        title: String,
        description: String,
        aiGenerated: { type: Boolean, default: false }
    }],

    // Visibility and Metadata
    isPublic: {
        type: Boolean,
        default: false
    },
    tags: [String],
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
worldSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for AI enhancement status
worldSchema.virtual('hasAiContent').get(function() {
    return this.aiMetadata.enhancementCount > 0;
});

// Virtual for AI features used
worldSchema.virtual('aiFeaturesList').get(function() {
    return this.aiMetadata.aiFeatures.join(', ');
});

module.exports = mongoose.model('World', worldSchema);
