import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  InputBase,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import navlogo from '../assets/mlogo.png';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ px: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        {/* Logo and Title with navigation to /home */}
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mb: { xs: 1, md: 0 } }}
        >
          <img src={navlogo} alt="nav_logo" style={{ height: 40, marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            MOVIE EXPLORER
          </Typography>
        </Box>

        {/* Nav Links */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/details" color="inherit">
            Movie Details
          </Button>
          <Button component={RouterLink} to="/favourites" color="inherit">
            Favorites
          </Button>
          <Button component={RouterLink} to="/trendingmovies" color="inherit">
            Trending Movies
          </Button>
          <Button component={RouterLink} to="/trailers" color="inherit">
            Trailers
          </Button>
          <Button component={RouterLink} to="/login" color="inherit">
            Login
          </Button>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 2,
            marginRight: 2,
            width: { xs: '100%', sm: 'auto' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon sx={{ ml: 1, mr: 1 }} />
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: 'inherit', ml: 1, flex: 1 }}
          />
        </Box>

        {/* Icons and Subscribe Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Button variant="contained" color="secondary">
            Subscribe Now
          </Button>
        </Box>

        {/* Toggle Menu Icon for Mobile */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
