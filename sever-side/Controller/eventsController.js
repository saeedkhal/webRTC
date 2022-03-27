exports.handelEvents = (io, socket) => {
  const handelDisconnect = () => {
    console.log('peer disconnect');
    newPeerConnected = peersConneted.filter((peerId) => {
      peerId !== socket.id;
    });
    peersConneted = newPeerConnected;
  };

  const handelPreOffer = (data) => {
    console.log(data);
    const { calleeId, connectionType } = data;
    const callee = peersConneted.find((peerConneted) => {
      return peerConneted === calleeId;
    });
    if (callee) {
      data = {
        connectionType: connectionType,
        callerId: socket.id,
      };
      console.log('apccepted the call');
      io.to(callee).emit('pre-offer', data);
    }
  };

  socket.on('disconnect', handelDisconnect);
  socket.on('pre-offer', handelPreOffer);
};
