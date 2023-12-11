import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../app/features/userslice';
import { fetchLists, selectLists } from '../app/features/listslice';
import { fetchUsersdetail,selectUsersdetail } from '../app/features/usersdetailslice';
import cardslice, { fetchCards, selectCards } from '../app/features/cardslice';
import CardHeader from '@mui/material/CardHeader';
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,IconButton,
} from '@mui/material';
import background from '../image/projectbackground.jpg';
import ProjectDetailNavbar from '../components/ProjectDetailNavbar';
import ListInputPopup from '../components/ListInputPopup';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import CreateCardModel from '../components/CreateCardModel';


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
        console.log(error)
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


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  




const Cardslist=()=>{
  const Cards=useSelector(selectCards);
  const [expanded, setExpanded] = React.useState(false);

 

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
  const getCardColor = (priority) => {
    switch (priority) {
      case 3:
        return '#FF4040';
      case 2:
        return 'yellow';
      default:
        return '#59E659';
    }
  };
  

 

 
  return(
    <>
          <div className="cardlist" style={{marginTop:20}}>
            {Cards.map((card) => (



                       

             
                      <div key={card.card_id} style={{ marginTop: '10px'  }}>
                      <Card sx={{ maxWidth: 345, bgcolor:getCardColor(card.priority) }}>
                       

                        
                        
                        <CardHeader

                            
                       
                                
                          avatar={
                            <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">
                            
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title= {card.card_name.toUpperCase()}
                          subheader={card.date_of_creation}
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                                 <h1>HELLO</h1>
                             
                            </Typography>
                        </CardContent>
                        <CardActions >
                          
                          <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Description:</Typography>
                            <Typography paragraph>
                              {card.description}
                            </Typography>
                            <Typography paragraph>
                              Date of creation {card.date_of_creation}<br></br>
                              Deadline {card.deadline}
                            </Typography>
                           
                            
                          </CardContent>
                        </Collapse>
                      </Card>
                      </div>
            ))}
            

            </div>




  </>

  );

};
  

const Projectdetail = () => {
  const [ListPopup,setListPopup]=useState(false)
  const [listid,setlistid]=useState(1);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
 
  
  
  
  const { projectId, projectName } = useParams();
  const [OpenTable, setOpenTable] = useState(true);
  const [ShowCardList,setShowCardList]=useState(false);
  const dispatch = useDispatch();
  const Users = useSelector(selectUsers);
  const Lists=useSelector(selectLists);
  const [selectedListId ,setselectedListId]=useState(null)
  
  // const toggle = () => setModal(!modal);
 
 

  useEffect(() => {
    dispatch(fetchUsers(projectId));
    dispatch(fetchLists(projectId));

  }, [dispatch]);

  const showCards=(listId)=>{
    
    dispatch(fetchCards({ list_id: listId ,projectId: projectId })
    );
    if(ShowCardList===true){
      setShowCardList(false)
    }
    else{
      setShowCardList(true)
    }
    setselectedListId(listId)

    

  }
  const deleteList=(id)=>{
    try {
      const response =  axios.delete(`http://127.0.0.1:8000/api/list/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Token " + localStorage.getItem("token"), 
        },
      });
     

      if (response.status === 200) {
        alert('List deleted successfully!');
        dispatch(fetchLists(projectId));
       
      } else {
        dispatch(fetchLists(projectId));
        alert('List deleted successfully!');
       
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('An error occurred. Please try again later.');
    }
  };
    
  
  const closeListPopup = () => {
    setListPopup(false);
  };
  


  const handleButtonAction = () => {
     
   
    setOpenTable(true);
  };
  const addList=()=>{
    setListPopup(true)

  }
       
   
  const Assigntask=(id)=>{
    setModal(!modal)
    setlistid(id)
   

  }
  return (

        <>
        
    <div
        style={{background: `url(${background})`, 
        backgroundSize:'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        backgroundPosition: "center",
        height: "100vh",
        overflow:'auto'
       
        }}>
       {modal && <CreateCardModel assign={Assigntask} id={listid} projectId={projectId} style={{marginLeft: '20px', marginTop: '100px'}}/>}
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
                          
                                <Button variant="outlined" color="primary"  onClick={() => showCards(list.list_id)}>
                                  Cards
                                </Button>
                                <IconButton color="error" aria-label="delete" onClick={() => deleteList(list.list_id)}>
                                  <DeleteIcon />
                                </IconButton>
                          </div>
                        

                          {ShowCardList && selectedListId===list.list_id && <Cardslist/>}
                         
                        
                            {/* <button onClick={Assigntask}>Assign Task</button> */}
                           <Button variant="contained" color="secondary" endIcon={<AddIcon />} sx={{height:40,Width:100,position:'relative',marginTop:2,marginLeft:5}}  onClick={()=>Assigntask(list.list_id)} >
                            Assign task
                          </Button>
        
        
        
        

        
        
        

        
                          
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
    </>
  );
};

export default Projectdetail;
