import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../app/features/userslice';
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,IconButton,
} from '@mui/material';
import background from '../image/projectbackground.jpg';
import ProjectDetailNavbar from '../components/ProjectDetailNavbar';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const UserTable = ({ users,setOpenTable }) => {
 

  const { projectId, projectName } = useParams();
  
  
  
    
    const handleTableDone=()=>{
        setOpenTable(false)
    }
    const addmember=(user_id,project_id)=>{
    
      const postData={
        user: parseInt(user_id,10),
        project: parseInt(project_id, 10)
  
  
      }
      axios.post('http://127.0.0.1:8000/api/add-member/',postData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then((response)=>{
      if(response.status===201){
        alert("NEW MEMBER IS ADDED")
      }
      


    }).catch((error) => {
      if(error.response.status===400){
        alert("USER IS ALREADY A MEMBER OF THIS PROJECT")
      }
     
      
    });
    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TableContainer component={Paper} style={{ maxWidth: '600px',height:'50vh',marginTop:100 }}>
          <Table>
            <TableHead  style={{backgroundColor:'#630330',color:'white'}}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Serial No.</TableCell>
                {/* <TableCell  style={{ color: 'white' }}>Profile</TableCell> */}
                <TableCell style={{ color: 'white' }}>Username</TableCell>
                <TableCell  style={{ color: 'white' }}>Add Member</TableCell>
               
                <TableCell >  <Button variant="contained" color="primary" onClick={handleTableDone}>
                      Done
                    </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.user_id}  >
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{user.profile_pic}</TableCell> */}
                  <TableCell>{user.first_name ? user.first_name + ' ' + user.last_name : user.username}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={()=>addmember(user.user_id,projectId)}>
                      Add
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  

const Projectdetail = () => {
  
  const [OpenTable, setOpenTable] = useState(true);
  const dispatch = useDispatch();
  const Users = useSelector(selectUsers);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  


  const handleButtonAction = () => {
     
   
    setOpenTable(true);
  };
  const addList=()=>{
    alert("new list added")
  }

  return (
    <div
        style={{background: `url(${background})`, 
        backgroundSize:'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden"}}>
      <ProjectDetailNavbar onButtonAction={handleButtonAction} />
      
      
      {OpenTable && <UserTable users={Users} setOpenTable={setOpenTable} />} 
      
      <Button variant="contained" color="secondary" endIcon={<AddIcon />} sx={{marginLeft:'20px',marginTop:'100px'}} onClick={addList} >
        Add List 
      </Button>
        
      
      
    </div>
  );
};

export default Projectdetail;
