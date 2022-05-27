import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import { MdOutlineContentCopy } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';
import { MdChat, MdErrorOutline } from 'react-icons/md';
import { BiVideoRecording } from 'react-icons/bi';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { AppContext } from '../context';
import cnnectionTypes from '../utils/connectionTypes';

const Dashboard = () => {
  const AppGlobalData = useContext(AppContext);
  const { dispach, socket, error, isConnected } = AppGlobalData;
  const mySoket = useRef();
  const inputPersonalCode = useRef();
  const callee = useRef();

  const copyText = () => {
    navigator.clipboard.writeText(mySoket.current.innerHTML);
  };
  const sendChatOffer = () => {
    const calleeId = callee.current.value;

    if (!calleeId) {
      return dispach({
        type: 'UPDATE_ERROR',
        pyload: {
          pass: false,
          message: 'empty input please enter the id',
        },
      });
    }
    if (calleeId === socket.id) {
      return dispach({
        pass: false,
        message: 'invalid Id',
      });
    }
    const data = {
      connectionType: cnnectionTypes.chat,
      calleeId: calleeId, //calee is the recevier
    };
    socket.emit('pre-offer', data);
    dispach({
      type: 'UPDATE_SENDING_CALL',
      pyload: true,
    });

    dispach({
      pass: true,
    });
  };

  return (
    <Wrapper>
      <article>
        <div className="logo">
          <GiBrain />
        </div>
        <h1 className="header">Psy Awareness</h1>
        <div className="personal-code">
          <p className="personal-code-header">your personal code</p>
          <p>
            <span ref={mySoket}>
              {socket ? (
                socket.id
              ) : (
                <span className="conn-fail">
                  <AiFillExclamationCircle />
                  connection fail try again later
                </span>
              )}
            </span>

            <button onClick={copyText} className="copy-icon">
              {!socket ? ' ' : <MdOutlineContentCopy />}
            </button>
          </p>
        </div>
        <div className="meeting-code">
          <label>meeting code</label>
          <input ref={callee} type="text" placeholder="hjbbfdndnknz5sg"></input>
          <p className="error-message">
            {!error.pass ? <MdErrorOutline /> : ' '}
            {!error.pass ? error.message : ' '}
          </p>
        </div>
        <div className="chat-call">
          <button onClick={sendChatOffer}>
            Chat
            <MdChat />
          </button>
          <button>
            Video Call
            <BiVideoRecording />
          </button>
        </div>
        <div className="meeting-code">
          <label>stranger</label>
        </div>
        <div className="chat-call  strangers">
          <button>
            Chat
            <MdChat />
          </button>
          <button>
            Video Call
            <BiVideoRecording />
          </button>
        </div>
        <div className="checkbox">
          <input ref={inputPersonalCode} type="checkbox"></input>
          <label>Allow Stranger to enetr the meeting </label>
        </div>
      </article>
      <article className={!isConnected ? 'display-none' : 'disable'}></article>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  article {
    border-radius: 2px;
    padding: 20px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      25deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 0%,
      rgba(7, 7, 100, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );
    height: 100vh;
    box-sizing: border-box;
    .header {
      color: white;
      text-align: center;
      margin-top: 0px;
      font-size: 20px;
    }
    .logo {
      text-align: center;
      color: white;
      font-size: 70px;
    }
    .personal-code {
      color: white;
      background: rgb(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 7px;
      .conn-fail {
        display: flex;
        align-items: center;
        svg {
          color: #f2c802;
        }
      }
      .personal-code-header {
        font-weight: bold;
        text-transform: capitalize;
      }
      p {
        .copy-icon {
          float: right;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: white;
          font-size: 20px;
          transition: 0.3s;
          &:hover {
            color: orange;
          }
        }
      }
    }
    .meeting-code {
      padding: 7px;
      margin-top: 20px;
      text-transform: capitalize;
      color: white;
      line-height: 2;
      input {
        border: 2px solid transparent;
        background: transparent;
        color: white;
        border: 1px solid #8f9bd0;
        padding: 5px;
        outline: none !important;
        width: 100%;
        :focus {
          border: 1px solid white;
        }
      }
      .error-message {
        margin: 0;
        color: rgb(253 186 116);
        display: flex;
        align-items: center;
      }
    }
    .chat-call {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      align-items: center;
      button {
        background: white;
        padding: 10px;
        border: none;
        width: 120px;
        border-radius: 8px;
        display: flex;
        justify-content: space-evenly;
        padding: 8px;
        color: #053688;
        align-items: center;
        cursor: pointer;
        font-size: 15px;
      }
    }
    .strangers {
      margin-top: 0;
    }
    .checkbox {
      margin-top: 50px;
      outline: none !important;
      text-transform: capitalize;
      label {
        color: white;
      }
    }
  }
  .disable {
    top: 0;
    left: 0;
    z-index: 10;
    background: transparent;
    position: absolute;
    width: 100%;
    background: black;
    opacity: 0.5;
  }
  .display-none {
    display: none;
  }
`;
export default Dashboard;
