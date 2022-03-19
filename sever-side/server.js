const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;
// const server = app.listen(process.env.PORT || PORT);
const server = http.createServer(app);

const io = require('socket.io')(server);

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});
let peerConneted = [];
io.on('connection', (socket) => {
  peerConneted.push(socket.id);
  socket.on('disconnect', () => {
    console.log('peer disconnect');
    newPeerConnected = peerConneted.filter((peerId) => {
      peerId !== socket.id;
    });
    peerConneted = newPeerConnected;
  });
  console.log(peerConneted);
});
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
