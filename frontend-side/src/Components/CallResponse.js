import React from 'react';
import { MdPhoneCallback } from 'react-icons/md';
import styled from 'styled-components';
import { HiPhoneMissedCall } from 'react-icons/hi';
import { GlobalData } from '../context';
import responseTypes from '../utils/responseTypes';
import call from '../images/phone-pulse.gif';
const CallResponse = () => {
  const AppGlobalData = GlobalData();
  const {
    inComingCall,
    socket,
    connectedUserId,
    connectionType,
    myPeer,
    dispatch,
  } = AppGlobalData;
  // const { connectionType } = connectedUserData;
  const resonedToCall = (response) => {
    const data = {
      callerId: connectedUserId,
      calleePeerID: myPeer._id,
      preOfferAnswer:
        response === 'accept' ? responseTypes.accepted : responseTypes.rejected,
    };
    if (response === 'accept') {
      dispatch({
        type: 'UPDATE_ISCONNECTED',
        pyload: true,
      });
    }
    socket.emit('answar-pre-offer', data);
    dispatch({
      type: 'UPDATE_INCOMING_CALL',
      pyload: false,
    });
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
            <button onClick={() => resonedToCall('accept')}>
              <MdPhoneCallback />
            </button>
            <button onClick={() => resonedToCall('reject')}>
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

export default CallResponse;
