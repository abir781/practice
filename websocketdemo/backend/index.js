// index.js
const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send("Server running"));

// Start HTTP server
const server = app.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });

// In-memory messages for demo
let messages = []; // [{ sender, receiver, message, timestamp }]

wss.on('connection', (ws) => {
    console.log("Client connected");

    // Send previous messages if any
    if (messages.length > 0) {
        ws.send(JSON.stringify(messages));
    }

    ws.on('message', (data) => {
        let msg;
        try {
            msg = JSON.parse(data); // { sender, receiver, message }
        } catch (err) {
            console.error("Invalid JSON:", data);
            return;
        }

        msg.timestamp = new Date();

        // Save to memory
        messages.push(msg);

        // Broadcast to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify([msg])); // array for frontend uniformity
            }
        });
    });

    ws.on('close', () => console.log("Client disconnected"));
});
