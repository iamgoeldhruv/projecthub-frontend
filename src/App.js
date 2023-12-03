import React from 'react';

 import './App.css';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { BrowserRouter,Routes,Route} from "react-router-dom"
import SideNav from './components/SideNav';
import NewProjectform from './components/NewProjectform';
import Projectdetail from './containers/Projectdetail';

function App() {
  
  return (
    <>
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/projectapp/" element={<SideNav />} />
      <Route path="/projectapp/newproject" element={<NewProjectform />} />
      <Route path="/projectapp/project/id/:projectId/name/:projectName" element={<Projectdetail />} />

      
    </Routes>

    </BrowserRouter>
    </>
   
  );
}

export default App;
