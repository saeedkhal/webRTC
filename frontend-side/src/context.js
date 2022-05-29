import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
  useRef,
} from 'react';
import reducer from './reducer';
import { io } from 'socket.io-client';
import responseTypes from './utils/responseTypes';
import cnnectionTypes from './utils/connectionTypes';
const { Peer } = require('peerjs');
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const intialState = {
    loacalStream: null,
    remoteStream: null,
    localDescription: null,
    remoteDescription: null,
    localAudioEnabled: true,
    localVideoEnabled: true,
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
  const [state, dispatch] = useReducer(reducer, intialState);
  const [counter, setCounter] = useState(0);
  const myPeerRef = useRef('null');
  const localStreamRef = useRef('null');
  myPeerRef.current = state.myPeer;
  localStreamRef.current = state.loacalStream;
  const recieveAnswarPreOfferHandler = (data) => {
    dispatch({
      type: 'UPDATE_SENDING_CALL',
      pyload: false,
    });
    const { preOfferAnswer, calleePeerID } = data;
    if (preOfferAnswer === responseTypes.accepted) {
      dispatch({
        show: true,
        message: 'your call accepted',
      });
      dispatch({
        type: 'UPDATE_ISCONNECTED',
        pyload: true,
      });
      const call = myPeerRef.current.call(calleePeerID, localStreamRef.current);
      call.on('stream', function (stream) {
        dispatch({ type: 'UPDATE_REMOTE_STREAM', pyload: stream });
      });
    } else if (preOfferAnswer === responseTypes.rejected) {
      dispatch({
        show: true,
        message: 'your call rejected',
      });
    } else if (preOfferAnswer === responseTypes.notAvailable) {
      dispatch({
        show: true,
        message: 'callee not available ',
      });
    } else if (preOfferAnswer === responseTypes.notFound) {
      dispatch({
        show: true,
        message: 'callee not found ',
      });
    }
  };
  const incomingCallHandeller = (data) => {
    // data = connectionType: "chat", callerId: "13dPThXR0D5bvaZbAAAL"
    console.log(state);
    const { connectionType, callerId } = data;
    dispatch({
      type: 'UPDATE_USER_ID',
      pyload: callerId,
    });
    dispatch({ type: 'UPDATE_CONNECTION_TYPE', pyload: connectionType });
    if (connectionType === cnnectionTypes.chat || cnnectionTypes.video) {
      dispatch({
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
      dispatch({
        type: 'UPDATE_SOCKET',
        pyload: socket,
      });
      //all events recevied from server
      socket.on('pre-offer', incomingCallHandeller);
      socket.on('answar-pre-offer', recieveAnswarPreOfferHandler);
    });
  }, []);
  useEffect(() => {
    const peer = new Peer(undefined, {
      host: '/',
      port: 1024,
      path: 'peerjs/video-chat',
    });
    peer.on('open', () => {
      dispatch({
        type: 'UPDATE_MY_PEER',
        pyload: peer,
      });
    });
    peer.on('call', (call) => {
      console.log('call coming ');
      call.answer(localStreamRef.current);
      call.on('stream', (stream) => {
        dispatch({ type: 'UPDATE_REMOTE_STREAM', pyload: stream });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // this use Effect for peerjs
  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        counter,
        setCounter,
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
