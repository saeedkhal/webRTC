import React from 'react';
import styled from 'styled-components';

import Dashboard from './Dashboard';
import Messanger from './Messanger';
import VideoCall from './VideoCall';
function App() {
  return (
    <Wrapper className="App">
      <main>
        <Dashboard />
        <VideoCall />
        <Messanger />
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  main {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    height: 100vh;
  }
`;
export default App;
