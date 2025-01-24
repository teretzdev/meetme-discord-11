// test/app.test.js

// Import necessary modules
const { execSync } = require('child_process');

describe('app.js', () => {
    it('should log "Hello, World!" to the console', () => {
        // Capture the console output of running app.js
        const output = execSync('node app.js', { encoding: 'utf-8' });

        // Check if the output is as expected
        expect(output.trim()).toBe('Hello, World!');
    });
});
