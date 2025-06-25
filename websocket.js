import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('HTTP server is running. Try connecting to the WebSocket.');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('✅ Client connected!');

  ws.on('message', (message) => {
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.on('error', (error) => {
    console.error('Error: ', error)
  })

  ws.on('ping', () => {
    console.log('Ping')
    ws.send('pong')
  })

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});