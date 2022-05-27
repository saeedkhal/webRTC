import React, { useContext } from 'react';
import styled from 'styled-components';
// import { MdPhoneCallback } from 'react-icons/md';
import { HiPhoneMissedCall } from 'react-icons/hi';
import loading from '../images/loading.gif';
import { AppContext } from '../context';

const CallSending = () => {
  const AppGlobalData = useContext(AppContext);
  const { sendingCall, dispach } = AppGlobalData;
  const endCalling = () => {
    dispach({
      type: 'UPDATE_SENDING_CALL',
      pyload: false,
    });
  };
  return (
    <Wrapper>
      <div
        className={sendingCall ? 'call-request' : 'call-request display-none'}
      >
        <div className="call-conatiner">
          Calling ....
          <p className="call-icon">
            <img src={loading} alt="icon" />
          </p>
          <div className="res-rej-btn">
            <button onClick={endCalling}>
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
    left: 0px;
    height: 100vh;
    transition: 0.5;
    .call-conatiner {
      text-align: center;
      padding: 20px;
      .call-icon {
        text-align: center;
        padding: 20px 100px;
        margin: 0;
        margin-bottom: 20px;
        margin: 20px;

        img {
          width: 103px;
          height: 83px;
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
          padding: 10px 40px;
          font-size: 20px;
          background: #ee5959;
          color: white;
          margin-bottom: 20px;
          border-radius: 5px;
          opacity: 0.7;
          transition: 0.3s;
          cursor: pointer;
          :hover {
            opacity: 1;
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

export default CallSending;
