import React from 'react';
import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineAudioMuted, AiFillCamera } from 'react-icons/ai';
import { MdCallEnd } from 'react-icons/md';
import { RiRecordCircleFill, RiCameraSwitchLine } from 'react-icons/ri';

const VideoCall = () => {
  return (
    <Wrapper>
      <main>
        <section className="starter-bg">
          <span className="starter-icon">
            <BsPersonCircle />
          </span>
          <section className="localvideo diplay-none">
            <video autoPlay muted className="lv"></video>
          </section>
          <section className="remote-video diplay-none">
            <video autoPlay></video>
          </section>
          <scetion className="video-btns diplay-none">
            <button className="audio-btn">
              <AiOutlineAudioMuted />
            </button>
            <button className="audio-btn">
              <AiFillCamera />
            </button>
            <button className="audio-btn">
              <MdCallEnd />
            </button>
            <button className="audio-btn">
              <RiCameraSwitchLine />
            </button>

            <button className="audio-btn">
              <RiRecordCircleFill />
            </button>
          </scetion>
        </section>
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  main {
    position: relative;
    height: 100vh;
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
        background: #eee;
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
          background: #242a48;
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
