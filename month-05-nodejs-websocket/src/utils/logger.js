/**
 * Logger - Node.js & WebSocket Development
 * 
 * This module demonstrates advanced concepts learned during
 * the Node.js & WebSocket Development learning phase.
 */

const EventEmitter = require('events');

class Logger extends EventEmitter {
    constructor() {
        super();
        this.createdAt = new Date();
        console.log(`Logger initialized`);
    }
    
    async process() {
        try {
            const result = {
                status: 'success',
                message: 'Logger processing completed',
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

module.exports = Logger;

// Demonstration
if (require.main === module) {
    const processor = new Logger();
    processor.process().then(console.log).catch(console.error);
}
