import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NoMatch from './components/NoMatch';
import SignIn from './components/SignIn';
import Data from './components/Data';
import Dashboard from './components/Dashboard';
import useToken from './lib/useToken';
import Import from './components/Import';

function App() {
  const { token, setToken } = useToken();
  const [custom, setCustom] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Header
              token={token}
              setToken={setToken}
              custom={custom}
              setCustom={setCustom}
            />
          }
        >
          {!token && <Route index element={<SignIn setToken={setToken} />} />}
          {token && <Route index element={<Data custom={custom} />} />}
          <Route path="dashboard" element={<Dashboard custom={custom} />} />
          <Route path="import" element={<Import setCustom={setCustom} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
