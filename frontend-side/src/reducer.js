const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCAL_STREAM':
      return { ...state, loacalStream: action.pyload };
    case 'UPDATE_REMOTE_STREAM':
      return { ...state, remoteStream: action.pyload };
    case 'UPDATE_SCREEN_SHARING':
      return { ...state, screenSharing: action.pyload };
    case 'UPDATE_SCREEN_ACTIVE':
      return { ...state, screenSharingActive: action.pyload };
    case 'UPDATE_ALLOW_CONNECTION_FROM_STRANGERS':
      return { ...state, allowConnectionFromStrangers: action.pyload };
    case 'UPDATE_SOCKET':
      return { ...state, socket: action.pyload };
    case 'UPDATE_INCOMING_CALL':
      return { ...state, inComingCall: action.pyload };
    case 'UPDATE_CALLER_DATA':
      return { ...state, callerData: action.pyload };
    case 'UPDATE_SENDING_CALL':
      return { ...state, sendingCall: action.pyload };
    case 'UPDATE_ERROR':
      return { ...state, error: action.pyload };
    case 'UPDATE_DIALOG':
      return { ...state, dialog: action.pyload };

    default:
      return state;
  }
};

export default reducer;
