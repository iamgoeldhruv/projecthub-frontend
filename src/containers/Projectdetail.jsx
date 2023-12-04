import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../app/features/userslice';
import { fetchLists, selectLists } from '../app/features/listslice';
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,IconButton,
} from '@mui/material';
import background from '../image/projectbackground.jpg';
import ProjectDetailNavbar from '../components/ProjectDetailNavbar';
import ListInputPopup from '../components/ListInputPopup';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';



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
    const deleteMember=()=>{

    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
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
                  <TableCell>
                  <IconButton color="error" aria-label="delete" onClick={() => deleteMember()}>
                                  <DeleteIcon />
                                </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  

const Projectdetail = () => {
  const [ListPopup,setListPopup]=useState(false)
  
  
  const { projectId, projectName } = useParams();
  const [OpenTable, setOpenTable] = useState(true);
  const dispatch = useDispatch();
  const Users = useSelector(selectUsers);
  const Lists=useSelector(selectLists);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchLists(projectId));

  }, [dispatch]);

  const showCards=()=>{

  }
  const deleteList=()=>{

  }
  const closeListPopup = () => {
    setListPopup(false);
  };
  


  const handleButtonAction = () => {
     
   
    setOpenTable(true);
  };
  const addList=()=>{
    setListPopup(true)
  }

  return (
    <div
        style={{background: `url(${background})`, 
        backgroundSize:'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        backgroundPosition: "center",
        height: "100vh",
        overflow:'auto'
       
        }}>
      <ProjectDetailNavbar onButtonAction={handleButtonAction} />
      
      
      {OpenTable && <UserTable users={Users} setOpenTable={setOpenTable} />} 
      <div className="maincontent" style={{ marginLeft: '20px', marginTop: '100px',display: 'flex', flexDirection: 'row', }}>
            {Lists.map((list) => (
                <div key={list.list_id} style={{ marginRight: '10px' }}>
                   <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                          <Typography sx={{ fontSize:18,marginLeft:10 }} color="black" gutterBottom>
                           {list.list_name && list.list_name.toUpperCase()}
                          </Typography>
                          <div className="buttons" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          
                                <Button variant="outlined" color="primary"  onClick={() => showCards()}>
                                  Cards
                                </Button>
                                <IconButton color="error" aria-label="delete" onClick={() => deleteList()}>
                                  <DeleteIcon />
                                </IconButton>
                          </div>
                        
        
        
        
        

        
        
        

        
                          
                      </CardContent>
      
                    </Card>
                </div>
       ))}
          {ListPopup && <ListInputPopup onClose={closeListPopup} />}
      
            <Button variant="contained" color="secondary" endIcon={<AddIcon />} sx={{height:40,minWidth:200,position:'relative',marginTop:'100'}}  onClick={addList} >
              Add List 
            </Button>
      </div>
        
      
      
    </div>
  );
};

export default Projectdetail;
