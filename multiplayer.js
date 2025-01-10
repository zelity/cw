// Import required libraries
import { createSocket } from 'engine.io-client';

// Set up socket connection
const socket = createSocket('http://localhost:3000');

// Define event listeners for socket events
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('playerMove', (data) => {
  // Update player position on client-side
  const player = document.getElementById('player');
  player.style.top = `${data.y}px`;
  player.style.left = `${data.x}px`;
});

socket.on('emojiPlaced', (data) => {
  // Update grid with new emoji on client-side
  const grid = document.getElementById('grid');
  const cell = grid.children[data.y * 40 + data.x];
  cell.innerHTML = data.emoji;
  cell.style.backgroundColor = data.color;
  cell.dataset.filled = true;
});

socket.on('coinSpawned', (data) => {
  // Update coin position on client-side
  const coin = document.querySelector('.coin');
  coin.style.top = `${data.y}px`;
  coin.style.left = `${data.x}px`;
});

// Send player position to server on each key press
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    socket.emit('playerMove', { x: position.x, y: position.y - 1 });
    position.y--;
  } else if (event.key === 'ArrowDown') {
    socket.emit('playerMove', { x: position.x, y: position.y + 1 });
    position.y++;
  } else if (event.key === 'ArrowLeft') {
    socket.emit('playerMove', { x: position.x - 1, y: position.y });
    position.x--;
  } else if (event.key === 'ArrowRight') {
    socket.emit('playerMove', { x: position.x + 1, y: position.y });
    position.x++;
  }
});
