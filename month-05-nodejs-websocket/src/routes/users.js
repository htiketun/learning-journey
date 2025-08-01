/**
 * Users - Node.js & WebSocket Development
 * 
 * This module demonstrates advanced concepts learned during
 * the Node.js & WebSocket Development learning phase.
 */

const EventEmitter = require('events');

class Users extends EventEmitter {
    constructor() {
        super();
        this.createdAt = new Date();
        console.log(`Users initialized`);
    }
    
    async process() {
        try {
            const result = {
                status: 'success',
                message: 'Users processing completed',
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

module.exports = Users;

// Demonstration
if (require.main === module) {
    const processor = new Users();
    processor.process().then(console.log).catch(console.error);
}
