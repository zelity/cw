// Import required libraries
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// Set up database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/multiplayer', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for player data
const playerSchema = new mongoose.Schema({
  x: Number,
  y: Number,
});

// Define schema for emoji data
const emojiSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  emoji: String,
  color: String,
});

// Define schema for coin data
const coinSchema = new mongoose.Schema({
  x: Number,
  y: Number,
});

// Create models from schemas
const Player = mongoose.model('Player', playerSchema);
const Emoji = mongoose.model('Emoji', emojiSchema);
const Coin = mongoose.model('Coin', coinSchema);

// Set up routes for socket events
app.use(express.json());

app.post('/playerMove', (req, res) => {
  const player = new Player(req.body);
  player.save((err) => {
    if (err) {
      console.error(err);
    } else {
      io.emit('playerMove', req.body);
    }
  });
});

app.post('/emojiPlaced', (req, res) => {
  const emoji = new Emoji(req.body);
  emoji.save((err) => {
    if (err) {
      console.error(err);
    } else {
      io.emit('emojiPlaced', req.body);
    }
  });
});

app.post('/coinSpawned', (req, res) => {
  const coin = new Coin(req.body);
  coin.save((err) => {
    if (err) {
      console.error(err);
    } else {
      io.emit('coinSpawned', req.body);
    }
  });
});

// Start server
http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
