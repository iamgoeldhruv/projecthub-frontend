import React from 'react';
import { useSelector } from 'react-redux';
import SideNav from '../components/SideNav';

const Dashboard = () => {
  // Use useSelector to select the user data from the Redux store
    const token=localStorage.getItem('token')
  return (
    <>
 
      
   
    
      <h1>WELCOME TO DASHBOARD</h1>
    
          <p>{token}</p>
    
    </>
  );
};

export default Dashboard;
