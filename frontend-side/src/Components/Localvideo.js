import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GlobalData } from '../context';
function Localvideo() {
  const { updateLoacalStream } = GlobalData();
  const localVideo = useRef(null);
  const initaiteLocalVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        localVideo.current.addEventListener('loadedmetadata', () => {
          localVideo.current.play();
          console.log(localVideo.current);
        });
        updateLoacalStream(stream);
        //localVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log('error while video stream ');
        console.log(err);
      });
  };
  useEffect(() => {
    initaiteLocalVideo();
  }, []);
  return (
    <Wrapper>
      <main className="local-container">
        <video ref={localVideo} className="video"></video>
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .local-container {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    margin: 20px;
    position: relative;
    border: 1px solid rgb(241 245 249);
    .video {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
`;
export default Localvideo;
