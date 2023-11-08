import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../app/features/userslice';

const drawerWidth = 240;
const navItems = ['Add Member', 'View Team', 'Edit'];

// function UserTable({ users, onClose }) {
//   return (
//     <div style={{ position: 'absolute', top: '100px', right: '50px',zIndex:1000 }}>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.username}</td>
//               <td>
//                 <Button variant="contained" color="primary" onClick={() => console.log(`Add ${user.username}`)}>
//                   Add
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Button variant="contained" color="primary" onClick={onClose}>
//         Done
//       </Button>
//     </div>
//   );
// }

function ProjectDetailNavbar({ users, onButtonAction }) {
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showUserTable, setShowUserTable] = React.useState(false);
  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (item) => {
    if (item === 'Add Member') {
      
        onButtonAction();
    }
  };

 

 

  const drawerContent = (
    <div>
      <Typography variant="h6" sx={{ my: 2 }}>
        Project Hub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            PROJECT HUB
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => handleClick(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>

      {/* {showUserTable && (
        <UserTable users={Users} onClose={handleCloseUserTable} />
      )} */}
    </Box>
  );
}

export default ProjectDetailNavbar;
