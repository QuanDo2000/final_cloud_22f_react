import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NoMatch from './components/NoMatch';
import SignIn from './components/SignIn';
import Data from './components/Data';
import Dashboard from './components/Dashboard';
import useToken from './lib/useToken';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header token={token} setToken={setToken} />}>
          {!token && <Route index element={<SignIn setToken={setToken} />} />}
          {token && <Route index element={<Data />} />}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
