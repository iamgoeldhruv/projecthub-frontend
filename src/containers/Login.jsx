import { Button } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import Cookies from 'js-cookie';
<style>
  {`
    .loginpage {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: lightblue;
    }
  `}
</style>
// import { makeStyles } from "@mui/styles";
// const useStyles = makeStyles({
//     loginbutton: {
//         // margin:'500px',
        
           
       
      
//     },
//     loginpage: {
//        height:'100vh',
//        width:'100vw',
//        display:'flex',
//        flexDirection:'column',
//        justifyContent:'center',
//        alignItems:'center',
//        background:'lightblue'

      
//     },
//     button:{
//         color:'black',
        
//     },
//     appName:{
//        marginBottom:'50px',
//        size:'500'
        
//     }})
    const checkoauth =async () => {
        window.location.replace(
          "http://127.0.0.1:8000/auth/authorize",
          
        );
        const currentURL = window.location.href;
     
 
        


        
       

       
       
      };
      const handleLogin=async ()=>{
        checkoauth()
        
      

       

      }

const Login = () => {
    // const classes = useStyles();
    // const {loginbutton,loginpage,button,appName} = classes;
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






