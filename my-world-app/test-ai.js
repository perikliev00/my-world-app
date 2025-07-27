/**
 * AI Test Script for My World App
 * 
 * This script tests:
 * 1. Standard AI endpoints
 * 2. Neural AI endpoints
 * 3. Error handling
 * 
 * Usage: node test-ai.js
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TEST_WORLD_DATA = {
    name: 'Test AI World',
    type: 'fantasy',
    description: 'A mystical realm where magic flows through ancient forests',
    creator: 'AI Test Script',
    isPublic: true,
    tags: ['test', 'ai', 'fantasy']
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

// Helper functions
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
    console.log('\n' + '='.repeat(50));
    log(title, 'blue');
    console.log('='.repeat(50));
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Test functions
async function createTestWorld() {
    logSection('Creating Test World');
    
    try {
        const response = await axios.post(`${BASE_URL}/api/worlds`, TEST_WORLD_DATA);
        
        if (response.data.success) {
            log('✓ World created successfully', 'green');
            log(`  World ID: ${response.data.data._id}`);
            log(`  World Name: ${response.data.data.name}`);
            return response.data.data;
        } else {
            throw new Error('Failed to create world');
        }
    } catch (error) {
        log(`✗ Error creating world: ${error.message}`, 'red');
        throw error;
    }
}

async function testStandardAI(worldId) {
    logSection('Testing Standard AI Features');
    
    const tests = [
        {
            name: 'Generate Description',
            endpoint: '/ai/generate-description',
            data: TEST_WORLD_DATA
        },
        {
            name: 'Generate Characters',
            endpoint: '/ai/generate-characters',
            data: { worldData: TEST_WORLD_DATA, count: 2 }
        },
        {
            name: 'Generate Stories',
            endpoint: '/ai/generate-stories',
            data: { worldData: TEST_WORLD_DATA, count: 1 }
        },
        {
            name: 'Generate Magic System',
            endpoint: '/ai/generate-magic',
            data: { worldData: TEST_WORLD_DATA }
        },
        {
            name: 'Generate Timeline',
            endpoint: '/ai/generate-timeline',
            data: { worldData: TEST_WORLD_DATA, count: 3 }
        }
    ];

    for (const test of tests) {
        try {
            log(`\nTesting: ${test.name}`, 'yellow');
            const response = await axios.post(`${BASE_URL}${test.endpoint}`, test.data);
            
            if (response.data.success) {
                log(`✓ ${test.name} successful`, 'green');
                
                // Log sample of generated content
                if (response.data.data) {
                    const preview = JSON.stringify(response.data.data).substring(0, 100);
                    log(`  Preview: ${preview}...`, 'magenta');
                }
            } else {
                log(`✗ ${test.name} failed: ${response.data.message}`, 'red');
            }
            
            await delay(1000); // Rate limiting
        } catch (error) {
            log(`✗ ${test.name} error: ${error.message}`, 'red');
            
            // Check if it's an API key issue
            if (error.response && error.response.data) {
                log(`  Details: ${error.response.data.message}`, 'red');
            }
        }
    }
}

async function testNeuralAI(worldId) {
    logSection('Testing Neural AI Features');
    
    try {
        // Step 1: Emotional Analysis
        log('\nStep 1: Analyzing Emotional Context', 'yellow');
        const emotionResponse = await axios.post(`${BASE_URL}/neural/analyze-emotion/${worldId}`);
        
        if (emotionResponse.data.success) {
            log('✓ Emotional analysis complete', 'green');
            log(`  Emotional State: ${emotionResponse.data.data.emotionalState}`, 'magenta');
            log(`  Themes: ${emotionResponse.data.data.emotionalProfile.themes.join(', ')}`, 'magenta');
            
            await delay(1000);
            
            // Step 2: Neural Character Generation
            log('\nStep 2: Generating Neural Characters', 'yellow');
            const charResponse = await axios.post(`${BASE_URL}/neural/generate-characters/${worldId}`, { count: 2 });
            
            if (charResponse.data.success) {
                log('✓ Neural characters generated', 'green');
                log(`  Count: ${charResponse.data.data.count}`, 'magenta');
                log(`  Neural Process: ${charResponse.data.data.neuralProcess}`, 'magenta');
            }
            
            await delay(1000);
            
            // Step 3: Neural Story Generation
            log('\nStep 3: Generating Neural Stories', 'yellow');
            const storyResponse = await axios.post(`${BASE_URL}/neural/generate-stories/${worldId}`, { count: 1 });
            
            if (storyResponse.data.success) {
                log('✓ Neural stories generated', 'green');
                log(`  Count: ${storyResponse.data.data.count}`, 'magenta');
            }
            
        } else {
            log('✗ Emotional analysis failed', 'red');
        }
        
    } catch (error) {
        log(`✗ Neural AI error: ${error.message}`, 'red');
        
        if (error.response && error.response.data) {
            log(`  Details: ${error.response.data.message}`, 'red');
        }
    }
}

async function testAIStats() {
    logSection('Testing AI Statistics');
    
    try {
        const response = await axios.get(`${BASE_URL}/ai/stats`);
        
        if (response.data.success) {
            log('✓ AI stats retrieved', 'green');
            log(`  Total Worlds: ${response.data.data.totalWorlds}`, 'magenta');
            log(`  Worlds with AI: ${response.data.data.worldsWithAI}`, 'magenta');
            log(`  AI Enhancement Rate: ${response.data.data.aiEnhancementRate}`, 'magenta');
        }
    } catch (error) {
        log(`✗ Stats error: ${error.message}`, 'red');
    }
}

async function testNeuralStatus() {
    logSection('Testing Neural AI Status');
    
    try {
        const response = await axios.get(`${BASE_URL}/neural/status`);
        
        if (response.data.success) {
            log('✓ Neural AI status retrieved', 'green');
            log(`  Status: ${response.data.data.status}`, 'magenta');
            log(`  Limbic System: ${response.data.data.components.limbicSystem}`, 'magenta');
            log(`  Creative PFC: ${response.data.data.components.creativePFC}`, 'magenta');
            log(`  Analytical PFC: ${response.data.data.components.analyticalPFC}`, 'magenta');
            log(`  Memory Database: ${response.data.data.components.memoryDatabase}`, 'magenta');
        }
    } catch (error) {
        log(`✗ Neural status error: ${error.message}`, 'red');
    }
}

async function cleanup(worldId) {
    logSection('Cleanup');
    
    if (!worldId) {
        log('No world to clean up', 'yellow');
        return;
    }
    
    try {
        const response = await axios.delete(`${BASE_URL}/api/worlds/${worldId}`);
        
        if (response.data.success) {
            log('✓ Test world deleted', 'green');
        }
    } catch (error) {
        log(`✗ Cleanup error: ${error.message}`, 'red');
    }
}

// Main test runner
async function runTests() {
    console.clear();
    log('\n🧪 MY WORLD APP - AI TEST SUITE 🧪\n', 'blue');
    
    let worldId = null;
    
    try {
        // Check if server is running
        try {
            await axios.get(BASE_URL);
        } catch (error) {
            log('✗ Server is not running. Please start the server first.', 'red');
            return;
        }
        
        // Create test world
        const world = await createTestWorld();
        worldId = world._id;
        
        // Run standard AI tests
        await testStandardAI(worldId);
        
        // Run neural AI tests
        await testNeuralAI(worldId);
        
        // Test statistics
        await testAIStats();
        
        // Test neural status
        await testNeuralStatus();
        
        logSection('Test Summary');
        log('✓ All tests completed!', 'green');
        log('\nNote: Some tests may fail if OpenAI API key is not configured.', 'yellow');
        
    } catch (error) {
        log(`\n✗ Test suite failed: ${error.message}`, 'red');
    } finally {
        // Cleanup
        await cleanup(worldId);
    }
}

// Run tests
runTests().then(() => {
    log('\n🎉 Test suite finished!\n', 'blue');
    process.exit(0);
}).catch(error => {
    log(`\n💥 Fatal error: ${error.message}\n`, 'red');
    process.exit(1);
}); 