import React from 'react';
import { Button, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


const checkoauth = async () => {
  window.location.replace("http://127.0.0.1:8000/auth/authorize");
};

const handleLogin = async () => {
  checkoauth();
};
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Login = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth_token');
    const userId = params.get('userid');
    const userName = params.get('username');

    if (token !== null) {
      console.log(token);
      console.log(userId);
      console.log(userName);
      
      localStorage.setItem('token', token);
      localStorage.setItem('userid', userId);
      localStorage.setItem('username', userName);
      navigate('/projectapp');
    } else {
      console.log("TOKEN NOT FOUND");
    }
  }, []);
  

  return (
    <Box
      className="loginpage"
      sx={{ height:'100vh',display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundImage:'url(../image/12315.jpg)'
    }}
    >
       <Card sx={{minWidth: 275, width: '400px', height:'400px',display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FCF5E5' ,
        boxShadow: '10px 10px 10px rgba(0.9, 0.9, 0.9, 0.9)'}}>
       <CardContent>
      
      <div className="appName">
      <Typography variant="h3" fontWeight="bold"  style={{ marginBottom: '60px',marginLeft:'20px',color:'#191970',fontFamily: 'Copperplate',}}>
            Welcome to PROJECTHUB
      </Typography>
        
       
      </div>
      <div className="loginbutton">
        <Button
        sx={{marginLeft:'40px'}}
          className="button"
          variant="contained"
          color="primary"
          startIcon={<LockIcon />}
          onClick={handleLogin}
        >
         <Typography  variant="h6" fontWeight="bold" style={{color:'white',fontFamily: 'Brush Script',}}>
            Login With Channeli
      </Typography>
        
        </Button>
      </div>
      </CardContent>
      </Card>
     
      
    </Box>
  );
};

export default Login;
