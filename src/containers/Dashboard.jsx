import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProjects, selectUserProjects } from '../app/features/projectslice';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Grid ,Box,Button} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const theme = createTheme({
  typography: {
    fontFamily: '"Helvetica Neue"', 
  },
  palette: {
    primary: {
      main: '#0077b6', 
    },
  },
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const userProjects = useSelector(selectUserProjects);

 
  useEffect(() => {
   
    
      dispatch(fetchUserProjects());
    
  }, [dispatch]);
    


    const token=localStorage.getItem('token')
    
    if (token === null) {
      return (
        <div>
          <p>USER IS NOT AUTHENTICATED. PLEASE AUTHENTICATE.</p>
        </div>
      );
    }
    else{
     return (
      <>
         <Typography variant="h4" color="primary" align="center" font="Helvetica Neue">
         "IMG Projects Elevation: Elevating Creativity, Unifying Members, Achieving Excellence Together"
          </Typography>
          <Box height={40}/>
          <Grid container spacing={7}>
            {userProjects.map((project) => (
              <Grid item xs={4} key={project.project_id}>
                
                <Card sx={{ minWidth: 275,backgroundColor: '#AFE1AF' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         <Typography variant="h6" color="#3F00FF" align="center" font="Helvetica Neue" >CREATOR:{(project.creator.toUpperCase())}</Typography>
        </Typography>
        <Typography variant="h6" color="#black" align="center" font="Helvetica Neue" >
          {project.name.toUpperCase()}
         
        </Typography>
        <Box height={25}/>
        
        <Typography  variant="h6" color="black" font="Helvetica Neue" align="center">
          {project.wiki}
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
      <Button   variant="contained" size="small" endIcon={<ArrowForwardIcon />}>
  Explore
</Button>
      </CardActions>
    </Card>
              </Grid>
            ))}
          </Grid>
      </>
    );
    }
  
  
};

export default Dashboard;
