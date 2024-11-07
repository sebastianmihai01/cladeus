// server.js
const express = require('express');
const WebSocket = require('ws');

const PORT = 3000;
const app = express();

// Start the HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Broadcast function to send data to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Set up connection listener for WebSocket server
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket webhook server!' }));

    // Listen for client messages (optional)
    ws.on('message', (message) => {
        console.log('Received from client:', message);
    });

    // Handle client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Simulate an event every 5 seconds and broadcast it to all clients
setInterval(() => {
    const eventData = {
        event: 'data_update',
        data: { timestamp: new Date().toISOString(), value: Math.random() * 100 }
    };
    console.log('Broadcasting event:', eventData);
    broadcast(eventData);
}, 5000);
