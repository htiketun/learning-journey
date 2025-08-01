/**
 * Test suite for tests/websocket.js
 * Learning Month: Node.js & WebSocket Development
 */

const request = require('supertest');
const { expect } = require('@jest/globals');
const app = require('../websocket.js');

describe('tests/websocket Tests', () => {
    let server;
    
    beforeAll(async () => {
        // Setup test environment
        process.env.NODE_ENV = 'test';
        server = app.listen(0); // Use random available port
    });
    
    afterAll(async () => {
        // Cleanup
        if (server) {
            await server.close();
        }
    });
    
    beforeEach(() => {
        // Reset state before each test
        jest.clearAllMocks();
    });
    
    describe('Basic Functionality', () => {
        test('should initialize correctly', () => {
            expect(app).toBeDefined();
        });
        
        test('should handle basic requests', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
            
            expect(response.body).toHaveProperty('status', 'healthy');
        });
    });
    
    describe('WebSocket Functionality', () => {
        test('should establish WebSocket connection', (done) => {
            const io = require('socket.io-client');
            const client = io(`http://localhost:${server.address().port}`);
            
            client.on('connect', () => {
                expect(client.connected).toBe(true);
                client.disconnect();
                done();
            });
            
            client.on('connect_error', (error) => {
                done(error);
            });
        });
        
        test('should handle chat messages', (done) => {
            const io = require('socket.io-client');
            const client = io(`http://localhost:${server.address().port}`);
            
            client.on('connect', () => {
                client.emit('chat_message', {
                    user: 'test_user',
                    message: 'Hello, World!'
                });
            });
            
            client.on('message_received', (data) => {
                expect(data).toHaveProperty('user', 'test_user');
                expect(data).toHaveProperty('message', 'Hello, World!');
                client.disconnect();
                done();
            });
        });
    });
    
    describe('Error Handling', () => {
        test('should handle invalid routes', async () => {
            const response = await request(app)
                .get('/nonexistent-route')
                .expect(404);
            
            expect(response.body).toHaveProperty('error');
        });
        
        test('should validate input data', async () => {
            const response = await request(app)
                .post('/api/messages')
                .send({ /* invalid data */ })
                .expect(400);
            
            expect(response.body).toHaveProperty('error');
        });
    });
    
    describe('Performance Tests', () => {
        test('should handle multiple concurrent connections', async () => {
            const promises = [];
            
            for (let i = 0; i < 10; i++) {
                promises.push(
                    request(app)
                        .get('/health')
                        .expect(200)
                );
            }
            
            const responses = await Promise.all(promises);
            expect(responses).toHaveLength(10);
        });
    });
});

// Mock external dependencies
jest.mock('redis', () => ({
    createClient: jest.fn(() => ({
        connect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn()
    }))
}));

jest.mock('mongoose', () => ({
    connect: jest.fn(),
    connection: {
        on: jest.fn(),
        once: jest.fn()
    }
}));
