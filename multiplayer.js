const socket = io("http://localhost:3000");

// Set up socket connection
socket.on('connect', () => {
  console.log('Connected to server');
});

// Listen for the player move event
socket.on('playerMove', (data) => {
  const player = document.querySelector(`#player-${data.id}`);
  if (player) {
    player.style.transform = `translate(${data.x * 20}px, ${data.y * 20}px)`;
  }
});

// Listen for the emoji placed event
socket.on('emojiPlaced', (data) => {
  const grid = document.getElementById('grid');
  const cell = grid.children[data.y * 40 + data.x];
  cell.innerHTML = data.emoji;
  cell.dataset.filled = true;
  cell.style.backgroundColor = data.color;
});

// Handle player movement
document.addEventListener('keydown', (event) => {
  let newPos = { x: position.x, y: position.y };

  if (event.key === 'w') newPos.y--;
  else if (event.key === 's') newPos.y++;
  else if (event.key === 'a') newPos.x--;
  else if (event.key === 'd') newPos.x++;

  if (newPos.x >= 0 && newPos.x < 40 && newPos.y >= 0 && newPos.y < 40) {
    position = newPos;
    socket.emit('playerMove', { id: socket.id, x: position.x, y: position.y });
    updatePlayerPosition(); // A function you will already have in your existing code.
    checkCoinCollection(); // Your existing coin collection function.
  }
});
