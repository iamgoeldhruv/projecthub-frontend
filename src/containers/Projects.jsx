import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Grid, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from "react-router-dom"

import {fetchUserProjectsForUser,selectUserProjectsForUser } from '../app/features/projectslice'


const theme = createTheme({
  typography: {
    fontFamily: 'Sedgwick Ave Display, cursive',
    fontFamily: 'Shantell Sans, cursive',
    fontFamily: 'Ultra, serif',
    fontFamily: 'Ysabeau, sans-serif',
  },
  palette: {
    primary: {
      main: '#0077b6',
    },
  },
});
const Projects = () => {
  const token=localStorage.getItem('token')
  const id=localStorage.getItem('userid')
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const userProjects = useSelector(selectUserProjectsForUser);
  useEffect(() => {
    dispatch(fetchUserProjectsForUser(id));
  }, [dispatch]);
  const  exploreProject=(id,name)=>{
    navigate(`/projectapp/project/id/${id}/name/${name}`);
  }

  if (token === null) {
    return (
      <div>
        <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
      </div>
    );
  }
  return (
    <div>
       <Typography variant="h3" color="primary" align="center" fontFamily="Cinzel">
          MY PROJECTS
        </Typography >
        <Box height={40} />
        <Grid container spacing={7}>
          {userProjects.map((project) => (
            <Grid item xs={4} key={project.project_id}>
              <Card sx={{ minWidth: 275, backgroundColor:'#C2B280'}}>
                <CardContent>
                  <Typography variant="h4" fontFamily="Cinzel" color="text.secondary" gutterBottom>
                    <Typography variant="h4" fontFamily="Kanit" color="text.secondary" align="center" >
                      CREATOR:{project.project.creator.toUpperCase()}
                    </Typography>
                  </Typography>
                  <Typography variant="h4" fontFamily="Kanit" color="purple" align="center" fontWeight="bold">
                    {project.project.name.toUpperCase()}
                  </Typography>
                  <Box height={25} />
                  <Typography variant="h5" color="black" fontFamily="Cinzel" align="center">
                    {project.project.wiki}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />}  onClick={() => exploreProject(project.project.project_id,project.project.name)}>
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </div>

  )
}

export default Projects
