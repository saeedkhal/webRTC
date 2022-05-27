import React, { createContext, useReducer, useEffect, useContext } from 'react';
import reducer from './reducer';
import { io } from 'socket.io-client';
import responseTypes from './utils/responseTypes';
import cnnectionTypes from './utils/connectionTypes';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const intialState = {
    loacalStream: null,
    remoteStream: null,
    localDescription: null,
    remoteDescription: null,
    screenSharing: null,
    screenSharingActive: false,
    allowConnectionFromStrangers: false,
    socket: null,
    connectedUserId: '',
    connectionType: '',
    inComingCall: false,
    sendingCall: false,
    dialog: {
      show: false,
      message: '',
    },
    dialogMessage: null,
    error: {
      pass: true,
      message: ' ',
    },
    isConnected: false,
    myPeer: {},
  };
  const [state, dispach] = useReducer(reducer, intialState);
  const recieveAnswarPreOfferHandler = (data) => {
    dispach({
      type: 'UPDATE_SENDING_CALL',
      pyload: false,
    });
    const { preOfferAnswer } = data;
    if (preOfferAnswer === responseTypes.accepted) {
      dispach({
        show: true,
        message: 'your call accepted',
      });
      // const call = state.myPeer.call(calleePeerID, state.loacalStream);
      // call.on('stream', (stream) => {
      //dispach({ type: 'UPDATE_REMOTE_STREAM', pyload: stream });
      // });
      dispach({
        type: 'UPDATE_ISCONNECTED',
        pyload: true,
      });
    } else if (preOfferAnswer === responseTypes.rejected) {
      dispach({
        show: true,
        message: 'your call rejected',
      });
    } else if (preOfferAnswer === responseTypes.notAvailable) {
      dispach({
        show: true,
        message: 'callee not available ',
      });
    } else if (preOfferAnswer === responseTypes.notFound) {
      dispach({
        show: true,
        message: 'callee not found ',
      });
    }
  };
  const incomingCallHandeller = (data) => {
    // data = connectionType: "chat", callerId: "13dPThXR0D5bvaZbAAAL"
    const { connectionType, callerId } = data;
    dispach({
      type: 'UPDATE_USER_ID',
      pyload: callerId,
    });
    dispach({ type: 'UPDATE_CONNECTION_TYPE', pyload: connectionType });
    if (connectionType === cnnectionTypes.chat || cnnectionTypes.video) {
      dispach({
        type: 'UPDATE_INCOMING_CALL',
        pyload: true,
      });
    }
  };

  // this use effect for websocket
  useEffect(() => {
    const socket = io('ws://127.0.0.1:1024');
    socket.on('connect', () => {
      console.log('socket connected');
      dispach({
        type: 'UPDATE_SOCKET',
        pyload: socket,
      });
      //all events recevied from server
      socket.on('pre-offer', incomingCallHandeller);
      socket.on('answar-pre-offer', recieveAnswarPreOfferHandler);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this use Effect for peerjs
  // useEffect(() => {
  //   const peer = new Peer(undefined, {
  //     host: '/',
  //     port: 1024,
  //     path: 'peerjs/video-chat',
  //   });
  //   peer.on('open', () => {
  // dispach({
  //   type: 'UPDATE_MY_PEER',
  //   pyload: peer,
  // });
  //   });
  //   peer.on('call', (call) => {
  //     call.answer(state.loacalStream);
  //     call.on('stream', (stream) => {
  //dispach({ type: 'UPDATE_REMOTE_STREAM', pyload: stream });
  //     });
  //   });
  // }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        dispach,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//custom hook
export const GlobalData = () => {
  return useContext(AppContext);
};
