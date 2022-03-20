import React from 'react';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';
const Messanger = () => {
  return (
    <Wrapper>
      <div className="message-container">
        <section className="local-message">
          <span>local- message</span>
        </section>
        <section className="remote-message">
          <span>
            remote message remote message remote message remote message remote
            message
          </span>
        </section>
        <section className="remote-message">
          <span>
            remote message remote message remote message remote message remote
            message
          </span>
        </section>{' '}
        <section className="remote-message">
          <span>
            remote message remote message remote message remote message remote
            message
          </span>
        </section>{' '}
        <section className="send">
          <div className="send-contianer">
            <input
              className="message"
              type="text"
              placeholder="write message"
            ></input>
            <button className="sned-btn">
              <AiOutlineSend />
            </button>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  .message-container {
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    section {
      margin-bottom: 20px;
      width: 80%;
      span {
        background: #eee;
        padding: 10px;
        display: inline-block;
        border-radius: 10px;
      }
    }
    .remote-message {
      margin-left: auto;

      span {
        background: #01b5e7;
        color: white;
      }
    }
    .local-message {
    }
    .send {
      width: 100%;
      margin: 0;
      .send-contianer {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0px;
        margin-bottom: 20px;
        text-align: center;
        input {
          flex: 1;
          outline: none !important;
          border-radius: 20px;
          padding: 10px;
          border: 2px solid #242a48;
        }
        button {
          background: transparent;
          color: #242a48;
          border: none;
          font-size: 20px;
          cursor: pointer;
          margin-left:10px;
]        }
      }
    }
  }
`;

export default Messanger;
