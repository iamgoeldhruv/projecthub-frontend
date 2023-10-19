import React from 'react';

import './App.css';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/" element={<Dashboard />} />
    </Routes>

    </BrowserRouter>
   
  );
}

export default App;
