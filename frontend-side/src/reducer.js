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
    case 'UPDATE_SENDING_CALL':
      return { ...state, sendingCall: action.pyload };
    case 'UPDATE_ERROR':
      return { ...state, error: action.pyload };
    case 'UPDATE_DIALOG':
      return { ...state, dialog: action.pyload };
    case 'UPDATE_ISCONNECTED':
      return { ...state, isConnected: action.pyload };
    case 'UPDATE_CONNECTION_TYPE':
      return { ...state, connectionType: action.pyload };
    case 'UPDATE_USER_ID':
      return { ...state, connectedUserId: action.pyload };
    case 'UPDATE_MY_PEER':
      return { ...state, myPeer: action.pyload };
    case 'UPDATE_LOCAL_AUDIO_ENABLE':
      return { ...state, localAudioEnabled: action.pyload };
    case 'UPDATE_LOCAL_VIDEO_ENABLE':
      return { ...state, localVideoEnabled: action.pyload };
    default:
      return state;
  }
};

export default reducer;
