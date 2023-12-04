import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from 'axios';
import {useNavigate} from "react-router-dom"



export default function AddressForm() {
  const navigate=useNavigate()
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
    creator: localStorage.getItem('userid'),
    date: today,
    title: "",
    description: "", 
    wiki: "", 
    github: "", 
    visibility: false, 
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
  
    const postData = {
      creator:localStorage.getItem('userid'),
      name: formData.title,
      description: formData.description,
      wiki: formData.wiki,
      github_link: formData.github,
      is_visible: formData.visibility,
      date_of_creation:format(today)
    }
    axios.post('http://127.0.0.1:8000/api/create_project/',postData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then((response)=>{
      if(response.status===201){
        var projectId=response.data.id;
        navigate(`/projectapp/project/id/${projectId}/name/${postData.name}`)

        
      }
      else{
        console.log("Error creating project")
      }
    }).catch((error)=>{
      console.log("error is",error)
    })
  };

  const token = localStorage.getItem('token');

  if (token === null) {
    return (
      <div>
        <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <form>
        <Box height={25} />
        <Typography variant="h3" color="primary" align="center" fontFamily="Cinzel">
          "Let's Get Started on Your New Project!"
        </Typography>
        <Paper elevation={3} sx={{ marginLeft: "15%", marginRight: "15%", marginTop: '1%', backgroundColor: "#D8BFD8", boxShadow: "10px 10px 10px 10px gray", height: '600px' }}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ paddingBottom: 5 }}>
              PROJECT HUB
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Title
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Title"
                  value={formData.title}
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
                  Description
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
              <TextField
              id="description" 
              name="description"
              label="description"
              value={formData.description} 
              multiline
              fullWidth
              rows={4}
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
                  Wiki
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
              <TextField
              id="wiki" 
              name="wiki"
              label="Wiki"
              value={formData.wiki} 
              multiline
              fullWidth
              rows={2}
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
                  Github Link
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="github" // Corrected key name
                  name="github" // Corrected key name
                  label="Github"
                  value={formData.github} // Corrected key name
                  size="small"
                  autoComplete="off"
                  sx={{ backgroundColor: 'white', borderRadius: '20px' }}
                  InputProps={{ type: 'url' }} 
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
                  Visible to all
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  type="checkbox"
                  name="visibility"
                  checked={formData.visibility}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={4}>
                <Button variant="contained" sx={{ color: "red" }} onClick={handleSubmit}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </Paper>
      </form>
    </React.Fragment>
  );
}
