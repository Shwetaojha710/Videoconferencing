const Fastify = require('fastify');
const fastifyWebsocket = require('@fastify/websocket');
const path = require('path');

const fastify = Fastify();

// Register the WebSocket plugin
fastify.register(fastifyWebsocket);

// Serve the static HTML file (client-side code)
fastify.get('/', (req, reply) => {
  return reply.sendFile('index.html'); // Make sure the file is in the 'public' folder
});

// Serve static files (e.g., client-side HTML)
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'), // The folder containing index.html
  prefix: '/', // Optional: Make the file accessible from the root URL
});

// WebSocket route for the meeting
fastify.get('/meeting', { websocket: true }, (connection, req) => {
  console.log('A user connected to the meeting');
  
  connection.on('message', (message) => {
    console.log('Received message:', message);
  });

  connection.on('close', () => {
    console.log('A user disconnected from the meeting');
  });

  connection.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});


// Start the server
const start = async () => {
  try {
    // Ensure you're listening on the correct port
    await fastify.listen({ port: 3000, host: 'localhost' });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    console.log('Error starting server:', err);
    process.exit(1);
  }
};

start();
