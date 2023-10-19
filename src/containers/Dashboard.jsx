import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  // Use useSelector to select the user data from the Redux store
  const user = useSelector((state) => state.user);
  console.log('stored token is'+localStorage.getItem('token'));

  return (
    <div>
    
      <h1>WELCOME TO DASHBOARD</h1>
      {user.isauthenticated ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Token: {user.token}</p>
          <p>User ID: {user.userId}</p>
        </div>
      ) : (
        <p>User is not authenticated.</p>
      )}
    </div>
  );
};

export default Dashboard;
