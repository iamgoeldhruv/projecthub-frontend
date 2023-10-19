import { Button } from '@mui/material';
import { useEffect } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/features/userslice';


const checkoauth =async () => {
        window.location.replace(
          "http://127.0.0.1:8000/auth/authorize",
        );
      };
      const handleLogin=async ()=>{
        checkoauth()
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);
      const token=params.get('auth_token')
      const userId=params.get('userid')
      const userName=params.get('username')
      if(token!==null){
        console.log(token)
        console.log(userId)
        console.log(userName)
        dispatch(setUser({ username: userName, token, userId }));
        localStorage.setItem('token', token);
        localStorage.setItem('userid',userId);
        localStorage.setItem('username',userName);
        navigate('/dashboard')
      }
      else{
        console.log("TOKEN NOT FOUND")
      }
    },[dispatch])
    
  return (
    <>
    <div className="loginpage">
        <div className="appName">
            Welcome to PROJECTHUB
        
        </div>
        <div className="loginbutton">
        <Button className="button"
            variant="contained"
            color="primary"
           
            startIcon={<LockIcon />}
            onClick={handleLogin}
        >
            Login With Channeli
        </Button>
        </div>
    </div>
         
    </>
  )
}

export default Login






