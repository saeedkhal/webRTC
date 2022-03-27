import React from 'react';
import styled from 'styled-components';

import Dashboard from './Components/Dashboard';
import Messanger from './Components/Messanger';
import VideoCall from './Components/VideoCall';
import CallRequest from './Components/CallRequest';
import CallSending from './Components/CallSending';
function App() {
  return (
    <Wrapper className="App">
      <main>
        <Dashboard />
        <VideoCall />
        <Messanger />
        <CallSending />
        <CallRequest />
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  main {
    position: relative;
    max-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
`;
export default App;
