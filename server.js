const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const { readdirSync } = require('fs')
const path = require('path');
const app = express();
const server = http.createServer(app);
let rooms = {}; // Track rooms and their hosts
require('dotenv').config();
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
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", (roomId, userId,username) => {
    console.log("User joining room:userId",roomId, userId);
    console.log("User joining room:", roomId, userId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push({ userId ,username});
    socket.join(roomId);

    // Notify others about the new user
    // socket.broadcast.to(roomId).emit("user-connected", userId,username);
    socket.to(roomId).emit('user-connected', userId, username);
    socket.on("leave-room", (id, localStreamid) => {
      console.log(`User ${userId} leaving room: ${roomId}`);
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((user) => user.userId !== userId);
        socket.to(roomId).emit("user-disconnected", localStreamid);

        // Clean up the room if no users are left
        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }
      }
      socket.leave(roomId);
    });

    socket.on("screen-sharing", () => {
      console.log(`User ${userId} is sharing their screen in room ${roomId}`);
      socket.broadcast.to(roomId).emit("screen-sharing", { userId });
    });

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((user) => user.userId !== userId);
        socket.to(roomId).emit("user-disconnected", userId);

        if (rooms[roomId].length == 0) {
          delete rooms[roomId];
        }
      }
    });
  });

  socket.on('chat-message', ({ roomId, message,username }) => {
    console.log(username,"chate username");
    
    socket.to(roomId).emit('chat-message', { userId: socket.id, message,username });
});
});
const body = require('body-parser');
app.use(body.json({ limit: '50mb' }))
app.use(body.urlencoded({ extended: true }))
app.use(express.json())
readdirSync('./app/routes').map((route) =>
    // console.log(route)
    app.use('/api', require('./app/routes/' + route))
)

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
