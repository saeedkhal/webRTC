let peersConneted = [];
const { handelDisconnect, handelPreOffer } = require('./eventsController');
exports.handleConnection = (socket) => {
  peersConneted.push(socket.id);
  socket.on('disconnect', handelDisconnect);
  socket.on('pre-offer', handelPreOffer);
  console.log(peersConneted);
};
