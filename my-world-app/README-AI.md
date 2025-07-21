# My World App - AI Enhanced Edition

A comprehensive world-building application powered by artificial intelligence. Create, enhance, and explore imaginative worlds with AI-generated content including characters, stories, magic systems, and more.

## 🌟 AI-Powered Features

### 🤖 Core AI Capabilities

1. **World Description Enhancement**
   - Transform basic descriptions into rich, detailed narratives
   - Generate atmospheric and immersive world descriptions
   - Create unique storytelling elements

2. **Character Generation**
   - Generate compelling characters with backstories
   - Create personality traits and motivations
   - Build character relationships and conflicts

3. **Story & Adventure Creation**
   - Generate quests, adventures, and story hooks
   - Create plotlines with varying difficulty levels
   - Develop story rewards and consequences

4. **Magic System Design**
   - Create balanced magic systems
   - Generate spells with requirements and effects
   - Design magical rules and limitations

5. **Timeline Generation**
   - Create historical events that shaped the world
   - Generate chronological world history
   - Build significant moments and their impacts

6. **Geography Enhancement**
   - Generate detailed geographic features
   - Create landmarks and points of interest
   - Design terrain and climate descriptions

7. **Image Prompt Generation**
   - Generate prompts for world maps
   - Create character portrait descriptions
   - Design concept art prompts

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-world-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up OpenAI API**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add it to your `.env` file:
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open http://localhost:3000
   - Click "Create World" → "AI Enhanced" to start

## 📚 AI Features Guide

### Creating Worlds with AI

#### Method 1: AI-Enhanced Creation Form
1. Navigate to `/world/new-ai`
2. Fill in basic world information
3. Select AI features to enable:
   - ✅ Enhanced Description
   - ✅ Detailed Geography
   - ✅ Characters (3)
   - ✅ Stories/Adventures (2)
   - ✅ Magic System
   - ✅ Timeline Events (5)
4. Click "Create World with AI"
5. Watch as AI generates content automatically

#### Method 2: Enhance Existing Worlds
1. Create a basic world using the standard form
2. View the world and click "Enhance with AI" buttons
3. Select specific features to add:
   - Add Characters
   - Add Stories
   - Add Timeline
   - Add Magic System
   - Enhance Geography

### AI-Generated Content Types

#### Characters
```javascript
{
  name: "Character Name",
  role: "protagonist|antagonist|supporting|npc",
  description: "Physical and personality description",
  backstory: "Character's history and background",
  personality: "Key personality traits",
  motivations: "What drives this character",
  relationships: [
    {
      characterName: "Other Character",
      relationshipType: "friend|enemy|lover|mentor",
      description: "Nature of relationship"
    }
  ],
  aiGenerated: true
}
```

#### Stories/Adventures
```javascript
{
  title: "Story Title",
  type: "quest|adventure|mystery|conflict",
  description: "Brief story overview",
  plot: "Detailed plot description",
  characters: ["Character names involved"],
  locations: ["Places where story occurs"],
  rewards: "What players/characters gain",
  difficulty: "easy|medium|hard|epic",
  aiGenerated: true
}
```

#### Magic Systems
```javascript
{
  detailedMagic: "Comprehensive magic system description",
  spells: [
    {
      name: "Spell Name",
      description: "What the spell does",
      requirements: "What's needed to cast",
      effects: "What happens when cast",
      aiGenerated: true
    }
  ]
}
```

## 🔧 API Endpoints

### AI Enhancement Endpoints

#### Enhance World
```http
POST /ai/enhance-world/:id
Content-Type: application/json

{
  "features": ["description", "geography", "characters", "stories", "magic", "timeline"],
  "options": {
    "characterCount": 3,
    "storyCount": 2,
    "timelineCount": 5
  }
}
```

#### Generate Description
```http
POST /ai/generate-description
Content-Type: application/json

{
  "name": "World Name",
  "type": "fantasy",
  "description": "Basic description",
  "geography": { "climate": "temperate" },
  "technology": { "level": "medieval" }
}
```

#### Generate Characters
```http
POST /ai/generate-characters
Content-Type: application/json

{
  "worldData": {
    "name": "World Name",
    "type": "fantasy",
    "description": "World description"
  },
  "count": 3
}
```

#### Generate Stories
```http
POST /ai/generate-stories
Content-Type: application/json

{
  "worldData": {
    "name": "World Name",
    "type": "fantasy"
  },
  "characters": ["Character1", "Character2"],
  "count": 2
}
```

#### Generate Magic System
```http
POST /ai/generate-magic
Content-Type: application/json

{
  "worldData": {
    "name": "World Name",
    "type": "fantasy"
  }
}
```

#### Generate Timeline
```http
POST /ai/generate-timeline
Content-Type: application/json

{
  "worldData": {
    "name": "World Name",
    "type": "fantasy"
  },
  "count": 5
}
```

### Analytics Endpoints

#### AI Statistics
```http
GET /ai/stats
```

#### World AI Content
```http
GET /ai/worlds/:id/ai-content
```

## 🎨 AI Prompt Engineering

### World Description Prompts
The AI uses carefully crafted prompts to generate content:

```javascript
// Example prompt for world description
const prompt = `
Create a rich, detailed description for a ${worldData.type} world called "${worldData.name}".

Current description: ${worldData.description}

Please enhance this description to be more vivid, detailed, and engaging. Include:
- The world's unique atmosphere and feel
- Key distinguishing features
- What makes this world special
- Potential for storytelling and adventure
- Cultural and environmental highlights

Make it approximately 300-500 words and focus on creating an immersive experience for readers.
`;
```

### Character Generation Prompts
```javascript
// Example prompt for character generation
const prompt = `
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
`;
```

## 🔍 AI Content Analysis

### AI Metadata Tracking
Every AI-generated piece of content is tracked with metadata:

```javascript
{
  aiMetadata: {
    lastEnhanced: Date,
    enhancementCount: 3,
    aiFeatures: ["description", "characters", "stories"],
    generationPrompts: [
      {
        feature: "description",
        prompt: "Original prompt used",
        timestamp: Date
      }
    ]
  }
}
```

### Content Filtering
You can filter content by AI generation:

```javascript
// Get only AI-generated characters
const aiCharacters = world.characters.filter(c => c.aiGenerated);

// Get only AI-generated stories
const aiStories = world.stories.filter(s => s.aiGenerated);

// Check if world has AI content
const hasAI = world.hasAiContent; // Virtual property
```

## 🛠️ Configuration

### Environment Variables

#### Required
```env
OPENAI_API_KEY=your-openai-api-key
MONGODB_URI=mongodb://localhost:27017/my-world-app
SESSION_SECRET=your-session-secret
```

#### Optional
```env
# AI Configuration
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.8
AI_RATE_LIMIT=10

# Features
ENABLE_AI_FEATURES=true
ENABLE_IMAGE_GENERATION=false
```

### AI Model Configuration

#### Available Models
- `gpt-4` - Best quality, higher cost
- `gpt-3.5-turbo` - Good quality, lower cost
- `gpt-4-turbo` - Balanced quality and cost

#### Temperature Settings
- `0.0` - Very focused, consistent output
- `0.5` - Balanced creativity and consistency
- `0.8` - Creative, varied output (default)
- `1.0` - Maximum creativity, less predictable

## 📊 AI Analytics

### Usage Statistics
Track AI feature usage across your application:

```javascript
// Get AI statistics
const stats = await fetch('/ai/stats').then(r => r.json());

// Example response
{
  totalWorlds: 150,
  worldsWithAI: 45,
  aiEnhancementRate: "30.0%",
  mostUsedFeatures: [
    { feature: "description", count: 40 },
    { feature: "characters", count: 35 },
    { feature: "stories", count: 25 }
  ]
}
```

### Content Quality Metrics
- Enhancement count per world
- Feature usage distribution
- Generation success rates
- User engagement with AI content

## 🔒 Security & Rate Limiting

### API Key Security
- Store API keys in environment variables
- Never commit API keys to version control
- Use different keys for development and production

### Rate Limiting
```javascript
// Configure rate limiting for AI requests
const rateLimit = require('rate-limiter-flexible');

const aiRateLimiter = new rateLimit.RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 10, // Number of requests
  duration: 60, // Per minute
});
```

### Error Handling
```javascript
// Handle OpenAI API errors
try {
  const result = await aiService.generateContent(data);
} catch (error) {
  if (error.message.includes('OpenAI')) {
    // Handle API-specific errors
    console.error('AI service error:', error);
  }
}
```

## 🧪 Testing AI Features

### Manual Testing
1. Create a test world with basic information
2. Use the AI enhancement features
3. Verify generated content quality
4. Check AI metadata tracking

### API Testing
```bash
# Test description generation
curl -X POST http://localhost:3000/ai/generate-description \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test World",
    "type": "fantasy",
    "description": "A basic test world"
  }'

# Test character generation
curl -X POST http://localhost:3000/ai/generate-characters \
  -H "Content-Type: application/json" \
  -d '{
    "worldData": {
      "name": "Test World",
      "type": "fantasy"
    },
    "count": 2
  }'
```

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB instance
3. Configure proper session storage
4. Set up environment variables
5. Enable rate limiting
6. Monitor API usage and costs

### Cost Optimization
- Use appropriate model for your needs
- Implement caching for repeated requests
- Set reasonable rate limits
- Monitor OpenAI API usage

## 🤝 Contributing

### Adding New AI Features
1. Extend the `AIService` class
2. Add new prompt templates
3. Create response parsers
4. Add API endpoints
5. Update the frontend
6. Add tests

### Example: Adding a New Feature
```javascript
// In services/aiService.js
async generateNewFeature(worldData) {
  const prompt = this.buildNewFeaturePrompt(worldData);
  const response = await openai.chat.completions.create({
    model: this.model,
    messages: [
      {
        role: 'system',
        content: 'You are an expert in this new feature...'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: this.maxTokens,
    temperature: this.temperature
  });
  
  return this.parseNewFeatureResponse(response.choices[0].message.content);
}
```

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For questions or issues:
- Check the AI configuration
- Verify OpenAI API key and credits
- Review error logs
- Test with simple prompts first

---

**Happy AI-powered world building!** 🌍✨🤖 