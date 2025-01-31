const Fastify = require('fastify');
const fastify = Fastify();
const path = require('path');
const { Server } = require('socket.io');

const io = new Server(fastify.server, {
  cors: {
    origin: "*", // You may want to limit this for security
  },
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // static assets will be served from /public path
});

fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html'); // serve the main page
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', (offer) => {
    // Relay the offer to the other peer
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    // Relay the answer to the offerer
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    // Relay ICE candidates
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the Fastify server
const port = process.env.SERVER_PORT || 9000;
  fastify.listen({ port }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server running on http://127.0.0.1:${port}/`);
  });
