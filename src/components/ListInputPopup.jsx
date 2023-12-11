import {React,useState} from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useParams } from 'react-router-dom';

import Grid from "@mui/material/Grid";
import axios from 'axios';

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, selectLists } from '../app/features/listslice';



const ListInputPopup = ({ onClose }) => {
    const dispatch = useDispatch();
  
    const Lists=useSelector(selectLists);
    const { projectId, projectName } = useParams();
   
    const [formData, setFormData] = useState({
        
        list_name:"",
        project:"",

      });
    
      const handleChange = (event) => {
        const { name,value} = event.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
      
        const postData = {
            list_name: formData.name,
            project: projectId,
          
        }
        
        onClose()
        axios.post(`http://127.0.0.1:8000/api/project/${projectId}/create_list/`,postData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }).then((response)=>{
          if(response.status===201){
                dispatch(fetchLists(projectId));
                
    
            
          }
          else{
            console.log("Error creating project")
          }
        }).catch((error)=>{
          if(error.response.status===403){
            alert('Only project members are allowed to create list list in this project')
          }
          console.log("error is",error)
        })
      };
  return(
    <Card sx={{ maxWidth:400,minWidth:400, maxHeight:150}}>
    <CardContent>
    <form>
        <Box height={25} />
       

            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Name
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="name"
                  value={formData.name}
                  size="small"
                  autoComplete="off"
                  sx={{ backgroundColor: 'white', borderRadius: '20px' }}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Button variant="contained" sx={{ color: "red" }} onClick={handleSubmit}>
                  Create
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
      </form>

        
    </CardContent>

  </Card>
  )
}

export default ListInputPopup
