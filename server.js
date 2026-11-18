// Server realtime minimale per la demo NEXUS-7 (Express + Socket.io)
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const MAX_HISTORY = 300;
const history = [];            // ultimi messaggi, tutte le stanze
const socketsToUser = new Map(); // socket.id -> user id

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  socket.on('hello', ({ user }) => {
    socketsToUser.set(socket.id, user.id);
    socket.emit('history', history);
  });

  socket.on('message', (m) => {
    if (!m || typeof m.text !== 'string' || m.text.length > 1500) return;
    history.push(m);
    if (history.length > MAX_HISTORY) history.shift();
    socket.broadcast.emit('message', m);
  });

  socket.on('presence', (p) => socket.broadcast.emit('presence', p));
  socket.on('typing', (t) => socket.broadcast.emit('typing', t));

  socket.on('disconnect', () => {
    const id = socketsToUser.get(socket.id);
    socketsToUser.delete(socket.id);
    if (id) socket.broadcast.emit('leave', id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`NEXUS-7 online → http://localhost:${PORT}`));
