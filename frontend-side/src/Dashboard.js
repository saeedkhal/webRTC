import React from 'react';
import styled from 'styled-components';

import { MdOutlineContentCopy } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';
import { MdChat } from 'react-icons/md';
import { BiVideoRecording } from 'react-icons/bi';

const Dashboard = () => {
  return (
    <Wrapper>
      <section className="ccc">
        <div className="logo">
          <GiBrain />
        </div>
        <h1 className="header">Psy Awareness</h1>
        <div className="personal-code">
          <p className="personal-code-header">your personal code</p>
          <p>
            <span>hjbbfdndnknz5sg</span>
            <button className="copy-icon">
              <MdOutlineContentCopy />
            </button>
          </p>
        </div>
        <div className="meeting-code">
          <label>meeting code</label>
          <input type="text" placeholder="hjbbfdndnknz5sg"></input>
        </div>
        <div className="chat-call">
          <button>
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
          <input type="checkbox"></input>
          <label>Allow Stranger to enetr the meeting </label>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  section {
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
    }
    .logo {
      text-align: center;
      color: white;
      font-size: 100px;
    }
    .personal-code {
      color: white;
      background: rgb(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 7px;
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

        :focus {
          border: 1px solid white;
        }
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
`;
export default Dashboard;
