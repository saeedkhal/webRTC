import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { io } from 'socket.io-client';
import cnnectionTypes from './utils/connectionTypes';
import responseTypes from './utils/responseTypes';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const intialState = {
    loacalStream: null,
    remoteStream: null,
    screenSharing: null,
    screenSharingActive: false,
    allowConnectionFromStrangers: false,
    socket: null,
    callerData: {},
    inComingCall: null,
    sendingCall: null,
    error: {
      pass: true,
      message: ' ',
    },
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
  const updateCallerData = (callerData) => {
    dispach({
      type: 'UPDATE_CALLER_DATA',
      pyload: callerData,
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
  useEffect(() => {
    const socket = io('ws://127.0.0.1:1024');
    socket.on('connect', () => {
      console.log('socket connected');
      updateSocket(socket);
      socket.on('pre-offer', incomingCallHandeller);
      socket.on('answar-pre-offer', answarPreOffer);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const answarPreOffer = (data) => {
    updatSendingCall(false);
    const { preOfferAnswer } = data;
    if (preOfferAnswer === responseTypes.accepted) {
    } else if (preOfferAnswer === responseTypes.notavailable) {
    } else if (preOfferAnswer === responseTypes.notfound) {
    } else if (preOfferAnswer === responseTypes.rejected) {
    }
  };
  const incomingCallHandeller = (data) => {
    const { connectionType } = data;
    if (connectionType === cnnectionTypes.chat || cnnectionTypes.video) {
      updateIncomingCall(true);
    }
    updateCallerData(data);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        updateLoacalStream,
        updateRemoteStream,
        upadteScreenSharing,
        updateScreenSharingActive,
        updateAllowConnectionFromStrangers,
        updateSocket,
        updateIncomingCall,
        updateCallerData,
        updatSendingCall,
        updateError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
