/**
 * Room - Node.js & WebSocket Development
 * 
 * This module demonstrates advanced concepts learned during
 * the Node.js & WebSocket Development learning phase.
 */

const EventEmitter = require('events');

class Room extends EventEmitter {
    constructor() {
        super();
        this.createdAt = new Date();
        console.log(`Room initialized`);
    }
    
    async process() {
        try {
            const result = {
                status: 'success',
                message: 'Room processing completed',
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

module.exports = Room;

// Demonstration
if (require.main === module) {
    const processor = new Room();
    processor.process().then(console.log).catch(console.error);
}
