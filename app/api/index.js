const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
 
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
 
// In-memory store for users in each room: roomId => { socketId => { name } }
const usersInRoom = {};
 
io.on("connection", socket => {
  // Handle user joining a room
  socket.on("join-room", ({ roomId, name }) => {
    // Join the room
    socket.join(roomId);
 
    // Ensure there's a user list for the room
    if (!usersInRoom[roomId]) usersInRoom[roomId] = {};
    usersInRoom[roomId][socket.id] = { name };
 
    // Send existing users (except the current user) to the new user
    // In frontend where you receive 'all-users'
    socket.on("all-users", users => {
      console.log(users, "all-users");
 
      setTimeout(() => {
        users.forEach(({ id, name }) => {
          if (peersRef.current[id]) return;
 
          const peer = createPeer(id, currentStream, name);
          peersRef.current[id] = peer;
 
          setPeers(prev => ({
            ...prev,
            [id]: { peer, stream: currentStream, name }
          }));
        });
      }, 100); // Slight delay so all listeners are mounted
    });
 
 
    // Notify other users in the room that a new user has joined
    socket.to(roomId).emit("user-joined", { id: socket.id, name });
 
    // Store the roomId in the socket for later use
    socket.data.roomId = roomId;
  });
 
  // Handle user leaving the room
  socket.on("leave-room", () => {
    const roomId = socket.data.roomId;
    socket.to(roomId).emit("user-left", socket.id); // Notify others that the user left
    socket.leave(roomId); // Remove user from the room
  });
  socket.on("update-media-status", ({ userId, audio, video }) => {
    // Send to all peers except the user who made the change
    socket.broadcast.emit("update-media-status", { userId, audio, video });
  });
 
  // Handle user disconnecting
  socket.on("disconnect", () => {
    const roomId = socket.data.roomId;
    if (roomId) {
      socket.to(roomId).emit("user-left", socket.id);
      delete usersInRoom[roomId][socket.id];
 
      // If the room is empty now, delete it entirely
      if (Object.keys(usersInRoom[roomId]).length === 0) {
        delete usersInRoom[roomId];
      }
    }
  });
 
  socket.on("send-message", message => {
    const roomId = socket.data.roomId;
    const name = usersInRoom[roomId]?.[socket.id]?.name || "Unknown";
 
    const timestamp = new Date().toISOString();
 
    socket.to(roomId).emit("receive-message", {
      ...message,
      sender: name,
      timestamp,
    });
  });
 
  socket.on("raise-hand", ({ roomId, userId, name }) => {
 
    // Broadcast to everyone else in the room
    socket.to(roomId).emit("user-raised-hand", {
        userId,
        name,
        timestamp: new Date().toISOString(),
    });
});
 
 
socket.on("sending-signal", payload => {
  io.to(payload.userToSignal).emit("signal", {
      signal: payload.signal,
      from: payload.callerId,
      name: payload.name
  });
});
 
socket.on("returning-signal", payload => {
  io.to(payload.to).emit("signal", {
      signal: payload.signal,
      from: socket.id,
      name: payload.name
  });
});
 
 
  socket.on("mic-toggle", ({ userId, enabled }) => {
    // broadcast to everyone else
    socket.broadcast.emit("mic-toggle", { userId, enabled });
  });
  socket.on("video-toggle", ({ userId, enabled }) => {
    // broadcast to everyone else
    socket.broadcast.emit("video-toggle", { userId, enabled });
  });
});
 
server.listen(5000, () => console.log("Server running on http://localhost:5000"));