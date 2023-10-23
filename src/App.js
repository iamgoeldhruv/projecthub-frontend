import React from 'react';

import './App.css';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { BrowserRouter,Routes,Route} from "react-router-dom"
import SideNav from './components/SideNav';

function App() {
  return (
    <>
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/projectapp/" element={<SideNav />} />
      
    </Routes>

    </BrowserRouter>
    </>
   
  );
}

export default App;
