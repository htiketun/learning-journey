/**
 * Message - Node.js & WebSocket Development
 * 
 * This module demonstrates advanced concepts learned during
 * the Node.js & WebSocket Development learning phase.
 */

const EventEmitter = require('events');

class Message extends EventEmitter {
    constructor() {
        super();
        this.createdAt = new Date();
        console.log(`Message initialized`);
    }
    
    async process() {
        try {
            const result = {
                status: 'success',
                message: 'Message processing completed',
                timestamp: this.createdAt.toISOString()
            };
            
            this.emit('processed', result);
            return result;
        } catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}

module.exports = Message;

// Demonstration
if (require.main === module) {
    const processor = new Message();
    processor.process().then(console.log).catch(console.error);
}
