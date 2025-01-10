const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Assuming your sonar.html is in a folder called 'public'

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // Handle player movement
  socket.on('playerMove', (data) => {
    socket.broadcast.emit('playerMove', data); // Emit to all other clients
  });
  
  // Handle emoji placement
  socket.on('emojiPlaced', (data) => {
    socket.broadcast.emit('emojiPlaced', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
