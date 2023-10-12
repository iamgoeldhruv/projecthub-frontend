import { Button } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    loginbutton: {
      
    },
    loginpage: {
        height:'100vh',
        color:'lightblue'

      
    }})
   

const Login = () => {
    const classes = useStyles();
    const {loginbutton,loginpage} = classes;
  return (
    <>
    <div className={loginpage}>
        <div className={loginbutton}>
        <Button
            variant="contained"
            color="primary"
            startIcon={<LockIcon />}
        >
            Login With Channeli
        </Button>
        </div>
    </div>
         
    </>
  )
}

export default Login






