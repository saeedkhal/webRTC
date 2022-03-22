import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState('thi is state 1');
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
export default AppProvider;
