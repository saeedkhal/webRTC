const { handleConnection } = require('./Controller/connectionController.js');

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

// app.use(express.static('public'));
// app.get('/', (req, res) => {
//   res.sendFile('./public/index.html');
// });
io.on('connection', handleConnection);
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
