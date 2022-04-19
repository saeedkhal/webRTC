import React, { createContext, useReducer, useState } from 'react';
import reducer from './reducer';
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
