import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context';

function DialogResponse() {
  const AppGlobalData = useContext(AppContext);
  const { dialog, dispach } = AppGlobalData;
  const closeDialog = () => {
    dispach({
      type: 'UPDATE_DIALOG',
      pyload: {
        show: false,
        message: '',
      },
    });
  };
  useEffect(() => {
    let timeout;
    if (dialog.message.search(/(accepted)/) !== -1) {
      timeout = setTimeout(() => {
        dispach({
          type: 'UPDATE_DIALOG',
          pyload: {
            show: false,
            message: '',
          },
        });
      }, 4000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [dialog, dispach]);
  return (
    <Wrapper>
      <div
        className={dialog.show ? 'call-request' : 'call-request display-none'}
      >
        <div className="call-conatiner">
          <button className="close" onClick={closeDialog}>
            x
          </button>
          <p className="dialog">
            {dialog.message ? dialog.message : 'your call pending'}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

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
      background: white;
      border-radius: 5px;
      border-radius: 15px;
      background: #f5f5f2;
      .close {
        float: right;
        cursor: pointer;
        background: transparent;
        border: none;
        transition: 300;
        color: rgb(251 113 133);
        :hover {
          color: rgb(225 29 72);
        }
      }
      .dialog {
        clear: both;
        color: rgb(107 114 128);
        padding: 10px 0;
      }
    }
  }
  .display-none {
    display: none;
  }
`;
export default DialogResponse;
