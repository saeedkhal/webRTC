exports.handelEvents = (io, socket) => {
  const handelDisconnect = () => {
    console.log('peer disconnect');
    newPeerConnected = peersConneted.filter((peerId) => {
      return peerId !== socket.id;
    });
    peersConneted = newPeerConnected;
    console.log(newPeerConnected);
  };

  const handelPreOffer = (data) => {
    const { calleeId, connectionType } = data;
    const callee = peersConneted.find((peerConneted) => {
      return peerConneted === calleeId;
    });
    if (callee) {
      data = {
        connectionType: connectionType,
        callerId: socket.id,
      };
      io.to(callee).emit('pre-offer', data);
    } else {
      data = {
        preOfferAnswer: 'NOT_FOUND',
      };
      io.to(socket.id).emit('answar-pre-offer', data);
    }
  };
  const handelPreOfferAnswar = (data) => {
    const { callerId } = data;
    const caller = peersConneted.find((peerConneted) => {
      return peerConneted == callerId;
    });
    if (caller) {
      io.to(caller).emit('answar-pre-offer', data);
    }
    //change the not found and not available here  later
  };
  socket.on('disconnect', handelDisconnect);
  socket.on('pre-offer', handelPreOffer);
  socket.on('answar-pre-offer', handelPreOfferAnswar);
};
