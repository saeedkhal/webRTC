import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const upadteSocketId = (sockitId) => {
    setState((state) => {
      return { ...state, sockitId };
    });
  };

  const updateLoacalStream = (loacalStream) => {
    setState((state) => {
      return { ...state, loacalStream };
    });
  };

  const updateRemoteStream = (remoteStream) => {
    setState((state) => {
      return { ...state, remoteStream };
    });
  };

  const upadteScreenSharing = (screenSharing) => {
    setState((state) => {
      return { ...state, screenSharing };
    });
  };

  const updateScreenSharingAcrive = (screenSharingAcrive) => {
    setState((state) => {
      return { ...state, screenSharingAcrive };
    });
  };
  const UpdateAllowConnectionFromStrangers = (allowConnectionFromStrangers) => {
    setState((state) => {
      return { ...state, allowConnectionFromStrangers };
    });
  };

  const [state, setState] = useState({
    sockitId: null,
    loacalStream: null,
    remoteStream: null,
    screenSharing: null,
    screenSharingAcrive: false,
    allowConnectionFromStrangers: false,
  });

  return (
    <AppContext.Provider
      value={{
        state,
        upadteSocketId,
        updateLoacalStream,
        updateRemoteStream,
        upadteScreenSharing,
        updateScreenSharingAcrive,
        UpdateAllowConnectionFromStrangers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
