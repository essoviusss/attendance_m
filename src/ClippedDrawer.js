import * as React from 'react';
import { FaRegChartBar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { BsCalendarCheckFill } from "react-icons/bs";
import { RiFolderUserLine } from "react-icons/ri";
import { BiQrScan } from "react-icons/bi";
import { BiQr } from "react-icons/bi";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashBoard from './pages/dashboard_components/DashBoard';
import GenerateQR from './pages/GenerateQR';
import ManageQR from './pages/ManageQR';
import VerifiedInstructors from './pages/Instructor_components/verified_instructors';
import RejectedInstructors from './pages/Instructor_components/rejected_instructors';
import Instructor from './pages/Instructor_components/verify_instructors';
import "./styles.css"

const iconStyles = {
  fontSize: '40px',
  color: 'white',
};
const drawerWidth = 240;

export default function ClippedDrawer() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#000' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Attendance Monitoring Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#006738',
            color: 'white',
          },
        }}
      >
        
<Toolbar />
<Box sx={{ overflow: 'auto' }}>
<List>
<ListItem key="Dashboard" disablePadding >
<ListItemButton onClick={() => handleNavigation('Dashboard')}>
<ListItemIcon>
<FaRegChartBar style={iconStyles} />
</ListItemIcon>
<ListItemText primary="Dashboard" />
</ListItemButton>
</ListItem>
<ListItem key="Generate QR" disablePadding >
<ListItemButton onClick={() => handleNavigation('Generate QR')}>
<ListItemIcon>
<BiQrScan style={iconStyles}/>
</ListItemIcon>
<ListItemText primary="Generate QR" />
</ListItemButton>
</ListItem>
<ListItem key="Manage QR" disablePadding >
<ListItemButton onClick={() => handleNavigation('Manage QR')}>
<ListItemIcon>
<BiQr style={iconStyles} />
</ListItemIcon>
<ListItemText primary="Manage QR" />
</ListItemButton>
</ListItem>
          <ListItem key="Verify Instructor" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Verify Instructor')}>
              <ListItemIcon>
                <IoPerson style={iconStyles} />
              </ListItemIcon>
              <ListItemText primary="Verify Instructors" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Verified Instructors" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Verified Instructors')}>
              <ListItemIcon>
                <IoPersonAddSharp style={iconStyles}/>
              </ListItemIcon>
              <ListItemText primary="Verified Instructors" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Rejected Instructors" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Rejected Instructors')}>
              <ListItemIcon>
                <IoPersonRemoveSharp style={iconStyles}/>
              </ListItemIcon>
              <ListItemText primary="Rejected Instructors" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Attendance" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Attendance')}>
              <ListItemIcon>
                <BsCalendarCheckFill style={iconStyles} />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Profile')}>
              <ListItemIcon>
                <RiFolderUserLine style={iconStyles}/>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {currentPage === 'Dashboard' && (
          <DashBoard/>
        )}
        {currentPage === 'Generate QR' && (
          <GenerateQR/>
        )}
        {currentPage === 'Manage QR' && (
          <ManageQR/>
        )}
        {currentPage === 'Verify Instructor' && (
          <Instructor/>
        )}
        {currentPage === 'Verified Instructors' && (
          <VerifiedInstructors/>
        )}
        {currentPage === 'Rejected Instructors' && (
          <RejectedInstructors/>
        )}
        {currentPage === 'Attendance' && (
          <Typography paragraph>
            This is the Attendance page.
          </Typography>
        )}
        {currentPage === 'Profile' && (
          <Typography paragraph>
            This is the Profile page.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
