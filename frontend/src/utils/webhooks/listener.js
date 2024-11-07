// client.js
const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.on('open', () => {
    console.log('Connected to WebSocket server');
    // Optionally, send a message to the server
    socket.send(JSON.stringify({ message: 'Hello Server!' }));
});

// Listen for messages from the server
socket.on('message', (data) => {
    const event = JSON.parse(data);
    console.log('Received event:', event);
});

// Handle connection closure
socket.on('close', () => {
    console.log('Disconnected from WebSocket server');
});
