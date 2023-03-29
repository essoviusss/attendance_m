import * as React from 'react';
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
import HomeIcon from '@mui/icons-material/Home';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DashBoard from './pages/DashBoard';
import GenerateQR from './pages/GenerateQR';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Attendance Monitoring Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem key="Dashboard" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Dashboard')}>
              <ListItemIcon>
                <QrCodeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Generate QR" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Generate QR')}>
              <ListItemIcon>
                <QrCodeIcon />
              </ListItemIcon>
              <ListItemText primary="Generate QR" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Attendance" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Attendance')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding>
            <ListItemButton onClick={() => handleNavigation('Profile')}>
              <ListItemIcon>
                <QrCodeIcon />
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
