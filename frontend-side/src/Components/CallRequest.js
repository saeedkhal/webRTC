import React, { useContext } from 'react';
import styled from 'styled-components';
import { MdPhoneCallback } from 'react-icons/md';
import { HiPhoneMissedCall } from 'react-icons/hi';
import call from '../images/phone-pulse.gif';
import { AppContext } from '../Context';

const CallRequest = () => {
  const AppGlobalData = useContext(AppContext);
  const { inComingCall, setinComingCall, callerData } = AppGlobalData;
  const { connectionType } = callerData;
  const acceptCall = () => {
    setinComingCall(false);
  };
  const rejectCall = () => {
    setinComingCall(false);
  };

  return (
    <Wrapper>
      <div
        className={inComingCall ? 'call-request' : 'call-request display-none'}
      >
        <div className="call-conatiner">
          incoming {connectionType} request
          <p className="call-icon">
            <img src={call} alt="icon" />
          </p>
          <div className="res-rej-btn">
            <button onClick={acceptCall}>
              <MdPhoneCallback />
            </button>
            <button onClick={rejectCall}>
              <HiPhoneMissedCall />
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
    left: 0;
    height: 100vh;
    transition: 0.5;
    .call-conatiner {
      text-align: center;
      padding: 20px;
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
          display: flex;
          align-items: center;
          border: none;
          padding: 15px;
          font-size: 20px;
          background: #6de16d;
          color: white;
          margin-bottom: 20px;
          border-radius: 50%;
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
