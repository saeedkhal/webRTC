import { GlobalData } from '../context';
import cnnectionTypes from './connectionTypes';
const configration = {
  iceServers: [
    {
      urls: 'stun:stun.1.googal.com:13902',
    },
  ],
};
let peerConnection;
export const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configration);
  peerConnection.onicecandidate = (event) => {
    console.log('geting ice candidate from sun server');
    if (event.candidate) {
      //send our candidate to the peer
    }
  };
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === 'connected') {
      console.log('connected to other peera');
    }
  };
  //reciev track from remote peers
  const remoteStream = new MediaStream();
  GlobalData.updateLoacalStream(remoteStream);
  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };
  //addour trac to the  connections
  if (GlobalData.remoteStream === cnnectionTypes.video) {
    const { loacalStream } = GlobalData;
    for (const track of loacalStream.getTracks()) {
      peerConnection.addTrack(track, loacalStream);
    }
  }
};
export const sendwebRTCOffer = async () => {
  //   const offer = await peerConnection.createOffer();
  //   await peerConnection.setLocalDescription(offer);
  //   const data = {
  //       GlobalData.callerData
  //   }
  //   GlobalData.socket.emit("rtc-offer",data);
};
