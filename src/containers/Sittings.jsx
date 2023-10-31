import React from 'react'
import { Button } from '@mui/material';

const Sittings = () => {
  const token=localStorage.getItem('token')
  if (token === null) {
    return (
      <div>
        <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
      </div>
    );
  }
  const handleClick=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    window.location.replace("http://localhost:3000")
  }
  return (
    <Button variant="contained" color="secondary"  onClick={handleClick}>
   Logout
  </Button>
  )
}

export default Sittings
