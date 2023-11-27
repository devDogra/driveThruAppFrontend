import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Modal from '@mui/material/Modal'
import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import Logo from '../Logo/Logo';
import { useEffect } from 'react';
import checkIfLoggedIn from '../../../utils/checkIfLoggedIn';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import roles from '../../../config/roles';
import { useContext } from 'react';
import { LoggedInUserContext } from '../../contexts/loggedInUserContext';
import { Link as ReactRouterLink } from 'react-router-dom';


const pages = [
  { name: 'Home', route: '/', hideFrom: [] },
  { name: 'Menu', route: '/menu', hideFrom: [] },
  { name: 'About Us', route: '/about', hideFrom: [] },
  { name: 'Contact Us', route: '/contact', hideFrom: [] },
  { name: 'Login', route: null, hideFrom: [roles.Customer, roles.Employee, roles.Manager, roles.Admin] },
  { name: 'Profile', route: '/profile', hideFrom: [roles.Anonymous]}, 
  { name: 'Dashboard', route: '/dashboard', hideFrom: [roles.Anonymous, roles.Customer]}, 
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const logoSx = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const {
    isLoggedIn,
    loggedInUser,
    setIsLoggedIn,
    setLoggedInUser,
    errorCheckingLogin
  } = useContext(LoggedInUserContext);

  // console.log({ isLoggedIn, loggedInUser, errorCheckingLogin });


  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpen = () => setLoginModalOpen(true);
  const handleClose = () => setLoginModalOpen(false);

  function handleLogin(isLoggedIn, loggedInUser) {
    setIsLoggedIn(isLoggedIn);
    setLoggedInUser(loggedInUser);
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LunchDiningIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          {/* <Logo/> */}
          {/* Navbar main links */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              // console.log(loggedInUser?.role);
              // console.log(page.hideFrom); 
              if (page.hideFrom.includes(loggedInUser?.role)) return null;

              const buttonOnClick = (page.name == 'Login') ? handleOpen : handleCloseNavMenu;
              const marginLeft = ['Login', 'Profile'].includes(page.name) ? 'auto' : null;  
              return (
                <Button component={page.route && ReactRouterLink} to={page.route} key={page.name} onClick={buttonOnClick} sx={{ my: 2, color: 'white', display: 'block', marginLeft }}>
                  {page.name}
                </Button>
              )

            })}
          </Box>



          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>

      <LoginModal handleClose={handleClose} loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} onLogin={handleLogin}></LoginModal>

    </AppBar>


  );
}
export default Navbar;
