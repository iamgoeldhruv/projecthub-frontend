import { useState, forwardRef, useImperativeHandle ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Buttonmui from "@mui/material/Button";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectMembers,selectProjectMembers } from '../app/features/projectmembersslice';
import Select from 'react-select'; 



const  CreateCardModel= props=> {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedOptions1, setSelectedOptions1] = useState();
  const [show, setShow] = useState(true);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  function handleSelect(data) {
   
        // selectedOptions.push(data[0].value)
        setSelectedOptions(data);
    
  }
  
  function handleSelect1(data) {
    alert(data.value)
    setSelectedOptions1(data.value);
   
    
  }
  const priorityList=[{
    value:1,label:"Urgent"},
    {value:2,label:"Important"},
    {value:3,label:"Take time"

  }]
  useEffect(() => {
    console.log("Selected Options:", selectedOptions);
  }, [selectedOptions]);
  const handleClose = () => {
    props.assign()
  }
 
  const ProjectMembers=useSelector(selectProjectMembers)
  useEffect(() => {
   
    dispatch(fetchProjectMembers(props.projectId));
  }, [dispatch, props.projectId]);

  
  useEffect(() => {
    if (ProjectMembers) {
      const list = ProjectMembers.map(item => ({
        value: item.user.user_id,
        label: item.user.first_name?item.user.first_name:item.user.username,
      }));
      setUserList(list);
    }
  }, [ProjectMembers]);
//   useEffect(() => {
//     userList.forEach(user => {
//         alert(user.label);
//     });
// }, [userList]);

 
  const today = new Date();
  function format (date) {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }
  const [formData, setFormData] = useState({
 
    name: "",
    description: "", 
    deadline: "", 
   
  });
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const assigneeValues = selectedOptions.map(option => option.value);
  
    const postData = {
      list_id:props.id,
      card_name: formData.name,
      description: formData.description,
      deadline:formData.deadline,
      assignee:assigneeValues,
      priority:selectedOptions1,
      attachments:null,
      color:null,
    
      date_of_creation:format(today)
    }
    axios.post(`http://127.0.0.1:8000/api/card/create/`,postData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then((response)=>{
      if(response.status===201){
       
        // navigate(`/projectapp/project/id/${projectId}/name/${postData.name}`)
        alert('success')
        props.assign()

        
      }
      else{
        console.log("Error creating project")
      }
    }).catch((error)=>{
      console.log("error is",error)
    })
  };



 

  return (
    <>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: '50px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title> TASK!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
            <Box height={0} />
        <Paper elevation={3} sx={{ backgroundColor: "black", }}>
          <Box sx={{marginLeft:1,marginTop:2 }}>
           

            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                    <Typography variant="h8" gutterBottom sx={{marginTop:1,color:'white' }}>
                           Name
                    </Typography>
                  
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="NAME"
                  value={formData.name}
                  size="small"
                  autoComplete="off"
                  sx={{ backgroundColor: 'white', borderRadius: '20px' }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                     <Typography variant="h8" gutterBottom sx={{marginTop:1,color:'white' }}>
                           Desc
                    </Typography>
                  
                 
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
              <TextField
              id="description" 
              name="description"
              label="Description"
              value={formData.description} 
              multiline
              fullWidth
              rows={2}
              sx={{ backgroundColor: 'white', borderRadius: '20px' }}
              onChange={handleChange}
            />
              </Grid>
              <Grid item xs={12} sm={0}>
              <div className="app" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height: '100vh'
                        }}>
              
                <div className="dropdown-container" style={{zIndex:100}}>
                    <Select
                    options={userList}
                    placeholder="Choose Assignees"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                    />
                    
                </div>
    </div>
                 </Grid>
                 <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                    
                  }}
                >
                    <Typography variant="h8" gutterBottom sx={{marginTop:1,color:'white',marginLeft:1 }}>
                           Deadline
                    </Typography>
                  
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="deadline"
                  name="deadline"
                  label="YYYY-MM-DD"
                  value={formData.deadline}
                  size="small"
                  autoComplete="off"
                  sx={{ backgroundColor: 'white', borderRadius: '20px' }}
                  onChange={handleChange}
                />
              </Grid>
            
              <Grid item xs={12} sm={0}>
              <div className="app" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height: '100vh'
                       
                        }}>
              
                <div className="dropdown-container" style={{zIndex:99}}>
                    <Select
                    options={priorityList}
                    placeholder='Select Priority' 
                    value={selectedOptions1}
                    onChange={handleSelect1}
                    isSearchable={true}
                    
                    />
                    
                </div>
    </div>
    </Grid>
                 

                
              

              {/* <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} /> */}
              <Grid item xs={12} sm={0}  >
              <Button variant="primary" onClick={handleSubmit} >
                        Submit
          </Button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </Paper>
            </form>
           
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateCardModel;