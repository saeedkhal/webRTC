import React, { createContext, useReducer, useEffect, useContext } from 'react';
import reducer from './reducer';
import { io } from 'socket.io-client';
import responseTypes from './utils/responseTypes';
import cnnectionTypes from './utils/connectionTypes';
import {
  createPeerConnection,
  sendwebRTCOffer,
} from './utils/createPeerConnection';
import { Peer } from 'peerjs';
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
  };

  const [state, dispach] = useReducer(reducer, intialState);
  const updateLoacalStream = (loacalStream) => {
    dispach({ type: 'UPDATE_LOCAL_STREAM', pyload: loacalStream });
  };
  const updateRemoteStream = (remoteStream) => {
    dispach({ type: 'UPDATE_REMOTE_STREAM', pyload: remoteStream });
  };
  const upadteScreenSharing = (screenSharing) => {
    dispach({ type: 'UPDATE_SCREEN_SHARING', pyload: screenSharing });
  };

  const updateScreenSharingActive = (screenSharingActive) => {
    dispach({ type: 'UPDATE_SCREEN_ACTIVE', pyload: screenSharingActive });
  };

  const updateConnectionType = (connectionType) => {
    dispach({ type: 'UPDATE_CONNECTION_TYPE', pyload: connectionType });
  };

  const updateAllowConnectionFromStrangers = (allowConnectionFromStrangers) => {
    dispach({
      type: 'UPDATE_ALLOW_CONNECTION_FROM_STRANGERS',
      pyload: allowConnectionFromStrangers,
    });
  };
  const updateSocket = (socket) => {
    dispach({
      type: 'UPDATE_SOCKET',
      pyload: socket,
    });
  };
  const updateIncomingCall = (inComingCall) => {
    dispach({
      type: 'UPDATE_INCOMING_CALL',
      pyload: inComingCall,
    });
  };
  const updateConnectedUserId = (connectedUserId) => {
    dispach({
      type: 'UPDATE_USER_ID',
      pyload: connectedUserId,
    });
  };
  const updatSendingCall = (sendingCall) => {
    dispach({
      type: 'UPDATE_SENDING_CALL',
      pyload: sendingCall,
    });
  };
  const updateError = (error) => {
    dispach({
      type: 'UPDATE_ERROR',
      pyload: error,
    });
  };
  const updateDialog = (Dialog) => {
    dispach({
      type: 'UPDATE_DIALOG',
      pyload: Dialog,
    });
  };
  const updateIsConnected = (isConnected) => {
    dispach({
      type: 'UPDATE_ISCONNECTED',
      pyload: isConnected,
    });
  };

  const recieveAnswarPreOfferHandler = (data) => {
    updatSendingCall(false);
    const { preOfferAnswer } = data;
    console.log(data);
    if (preOfferAnswer === responseTypes.accepted) {
      console.log('call accepted');
      updateDialog({
        show: true,
        message: 'your call accepted',
      });
      updateIsConnected(true);
      createPeerConnection();
      sendwebRTCOffer();
    } else if (preOfferAnswer === responseTypes.rejected) {
      updateDialog({
        show: true,
        message: 'your call rejected',
      });
    } else if (preOfferAnswer === responseTypes.notAvailable) {
      updateDialog({
        show: true,
        message: 'callee not available ',
      });
    } else if (preOfferAnswer === responseTypes.notFound) {
      updateDialog({
        show: true,
        message: 'callee not found ',
      });
    }
  };
  const incomingCallHandeller = (data) => {
    // data = connectionType: "chat", callerId: "13dPThXR0D5bvaZbAAAL"
    const { connectionType, callerId } = data;
    updateConnectedUserId(callerId);
    updateConnectionType(connectionType);
    if (connectionType === cnnectionTypes.chat || cnnectionTypes.video) {
      updateIncomingCall(true);
    }
  };
  // this use effect for websocket
  useEffect(() => {
    const socket = io('ws://127.0.0.1:1024');
    socket.on('connect', () => {
      console.log('socket connected');
      updateSocket(socket);
      //all events recevied from server
      socket.on('pre-offer', incomingCallHandeller);
      socket.on('answar-pre-offer', recieveAnswarPreOfferHandler);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //this use Effect for peerjs
  useEffect(() => {
    const peer = new Peer(undefined, {
      host: '/',
      port: 1024,
      path: 'peerjs/video-chat',
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        updateLoacalStream,
        updateRemoteStream,
        upadteScreenSharing,
        updateScreenSharingActive,
        updateAllowConnectionFromStrangers,
        updateConnectionType,
        updateSocket,
        updateIncomingCall,
        updateConnectedUserId,
        updatSendingCall,
        updateError,
        updateDialog,
        updateIsConnected,
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
