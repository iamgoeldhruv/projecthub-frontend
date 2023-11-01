import React from 'react';

import './App.css';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { BrowserRouter,Routes,Route} from "react-router-dom"
import SideNav from './components/SideNav';
import NewProjectform from './components/NewProjectform';

function App() {
  
  return (
    <>
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/projectapp/" element={<SideNav />} />
      <Route path="/projectapp/newproject" element={<NewProjectform />} />
      
    </Routes>

    </BrowserRouter>
    </>
   
  );
}

export default App;
