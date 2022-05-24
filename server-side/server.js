const { handelEvents } = require('./Controller/eventsController');
const { ExpressPeerServer } = require('peer');
const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 1024;
// const server = app.listen(process.env.PORT || PORT);
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    Origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
  },
});

const peerServer = ExpressPeerServer(server, {
  path: '/video-chat',
});
app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('client connected');
});
global.peersConneted = [];
io.on('connection', (socket) => {
  peersConneted.push(socket.id);
  handelEvents(io, socket);

  console.log(peersConneted);
});
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
