import React from 'react';
import styled from 'styled-components';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import call from '../images/phone-pulse.gif';

const CallRequest = () => {
  return (
    <Wrapper>
      <div className="call-request display-none">
        <div className="call-conatiner">
          <p className="call-icon">
            <img src={call} alt="icon" />
          </p>
          <div className="res-rej-btn">
            <button>
              <MdOutlineDownloadDone />
            </button>
            <button>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .call-request {
    position: absolute;
    width: 100%;
    background: #4a4444b3;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    height: 100vh;
    transition: 0.5;
    .call-conatiner {
      .call-icon {
        text-align: center;
        padding: 0;
        margin: 0;
        margin-bottom: 20px;
        img {
          border-radius: 10px;
        }
      }
      .res-rej-btn {
        display: flex;
        justify-content: center;
        button {
          border: none;
          padding: 10px;
          border-radius: 50%;
          font-size: 20px;
          background: #6de16d;
          color: white;
          margin-bottom: 20px;
          opacity: 0.7;
          transition: 0.3s;
          cursor: pointer;
          :hover {
            opacity: 1;
          }
          &:nth-child(2) {
            margin-left: 20px;
            background: #ee5959;
          }
        }
      }
      background: white;
      border-radius: 5px;
      border-radius: 15px;
      background: #f5f5f2;
    }
  }
  .display-none {
    display: none;
  }
`;

export default CallRequest;
