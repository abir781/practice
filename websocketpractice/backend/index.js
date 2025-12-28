const WebSocket = require('ws');

const wss = new WebSocket.Server({
  host: '0.0.0.0',
  port: 5000
});

console.log("✅ WebSocket server running on ws://localhost:5000");

wss.on('connection', (ws) => {
  console.log("🟢 New client connected");

  ws.send("👋 Welcome to WebSocket Chat!");

  ws.on('message', (message) => {
    const text = message.toString(); // 🔑 Blob/Buffer → string
    console.log("📩 Received:", text);

    // 🔄 broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  ws.on('close', () => {
    console.log("🔴 Client disconnected");
  });
});
