import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../app/features/userslice';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import ProjectDetailNavbar from '../components/ProjectDetailNavbar';

const UserTable = ({ users,setOpenTable }) => {
    
    const handleTableDone=()=>{
        setOpenTable(false)
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
                <TableRow key={user.id}  >
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{user.profile_pic}</TableCell> */}
                  <TableCell>{user.first_name ? user.first_name + ' ' + user.last_name : user.username}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
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
    const [OpenTable, setOpenTable] = useState(false);
  const dispatch = useDispatch();
  const Users = useSelector(selectUsers);
  const [IsLoading, setIsLoading] = useState(false);
 

  const handleButtonAction = () => {
    dispatch(fetchUsers());
    setOpenTable(true);
  };

  return (
    <div>
      <ProjectDetailNavbar onButtonAction={handleButtonAction} />
      
      {OpenTable && <UserTable users={Users} setOpenTable={setOpenTable} />} 
      
    </div>
  );
};

export default Projectdetail;
