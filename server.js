const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const roomUUID = uuidv4(); // Generate a single UUID at startup
console.log(`Chat Room UUID: ${roomUUID}`);

app.get('/get-uuid', (req, res) => {
  res.json({ uuid: roomUUID });
});

// Route to generate a new room UUID
app.get('/create-room', (req, res) => {
  const newRoomId = uuidv4();
  res.json({ roomId: newRoomId });
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When user joins a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    io.to(roomId).emit('message', `User ${socket.id} joined the room`);
    socket.to(roomId).emit('user-joined', socket.id);
  });

  // Handle text messages
  socket.on('message', ({ roomId, message }) => {
    io.to(roomId).emit('message', message);
  });

  // WebRTC signaling
  socket.on('offer', ({ roomId, offer, userId }) => {
    socket.to(roomId).emit('offer', { offer, userId });
  });

  socket.on('answer', ({ roomId, answer, userId }) => {
    socket.to(roomId).emit('answer', { answer, userId });
  });

  socket.on('ice-candidate', ({ roomId, candidate, userId }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, userId });
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit('user-left', socket.id);  // Notify others about the user leaving
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
