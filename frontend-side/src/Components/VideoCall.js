import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { BiCameraOff, BiCamera } from 'react-icons/bi';

import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
import { MdCallEnd } from 'react-icons/md';
import { RiRecordCircleFill, RiCameraSwitchLine } from 'react-icons/ri';
import Localvideo from './Localvideo';
import { GlobalData } from '../context';
const VideoCall = () => {
  const {
    remoteStream,
    loacalStream,
    localAudioEnabled,
    localVideoEnabled,
    dispatch,
  } = GlobalData();
  const handleScreenSharing = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
      })
      .then((stream) => {
        dispatch({
          type: 'UPDATE_LOCAL_STREAM',
          pyload: stream,
        });
      });
  };
  const remoteStreamRef = useRef(null);
  const handleMicrophone = () => {
    console.log(loacalStream.getAudioTracks()[0].enabled);
    loacalStream.getAudioTracks()[0].enabled = !localAudioEnabled;
    dispatch({
      type: 'UPDATE_LOCAL_AUDIO_ENABLE',
      pyload: !localAudioEnabled,
    });
  };

  const handelCamera = () => {
    console.log(loacalStream.getVideoTracks()[0].enabled);
    loacalStream.getVideoTracks()[0].enabled = !localVideoEnabled;
    dispatch({
      type: 'UPDATE_LOCAL_VIDEO_ENABLE',
      pyload: !localVideoEnabled,
    });
  };
  useEffect(() => {
    if (remoteStream) {
      remoteStreamRef.current.addEventListener('addedmetadata', () => {
        remoteStreamRef.current.play();
      });
      remoteStreamRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  return (
    <Wrapper>
      <div>
        <article className="starter-bg">
          <span className="starter-icon">
            <BsPersonCircle />
          </span>
          <article className="remote-video">
            <video ref={remoteStreamRef} muted={true} autoPlay></video>
          </article>
          <section className="video-btns diplay-none">
            <button className="audio-btn" onClick={handleMicrophone}>
              {localAudioEnabled ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
            </button>
            <button
              className="audio-btn camera "
              style={{ transform: 'scaleX(-1)' }}
              onClick={handelCamera}
            >
              {localVideoEnabled ? <BiCamera /> : <BiCameraOff />}
            </button>
            <button className="audio-btn">
              <MdCallEnd />
            </button>
            <button className="audio-btn" onClick={handleScreenSharing}>
              <RiCameraSwitchLine />
            </button>

            <button className="audio-btn">
              <RiRecordCircleFill />
            </button>
          </section>
        </article>
      </div>
      <Localvideo />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  div {
    position: relative;
    .starter-bg {
      border: 10px solid white;
      box-sizing: border-box;
      border-radius: 20px;
      width: 100%;
      position: absolute;
      background: #242a48;
      height: 100vh;
      .starter-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: white;
      }

      .remote-video {
        position: absolute;
        width: 100%;
        height: 100%;
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .localvideo {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border-radius: 10px;
        background: red;
      }
      .video-btns {
        position: absolute;
        bottom: 0;
        margin-bottom: 50px;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        button {
          margin-left: 10px;
          font-size: 30px;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          color: #95939d;
          background: transparent;
          translate: 0.3s;
          :hover {
            color: white;
          }
        }
      }
    }
    .diplay-none {
      display: none;
    }
  }
`;

export default VideoCall;
