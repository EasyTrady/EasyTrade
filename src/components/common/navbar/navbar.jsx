import { AppBar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/images/g14.png';
import { ThemeProvider } from '@mui/system';
import { interFont } from '../themes.jsx';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [clientWindowHeight, setClientWindowHeight] = useState('');
  const [t, i18n] = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [padding, setPadding] = useState(20);
  const [boxShadow, setBoxShadow] = useState(0);
  // const { token } = useSelector((state) => state.auth);
  const pages = [
    t('home', { framework: 'React' }),
    t('services'),
    t('pricing'),
    t('features'),
    t('contactus')
  ];
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      let paddingVar = 20 - backgroundTransparacyVar * 20;
      let boxShadowVar = backgroundTransparacyVar * 0.1;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar   position="fixed" sx={{ background:'#cde3f3', boxShadow: boxShadow}}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            padding:0,
            '& hr': {
              mx: 1,
              color: '#7F7F7F',
              my: 2
            }
          }}
        >
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box
            
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex', xs: 'none' },
              fontFamily: 'Cairo',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none'
            }}
          >
            <img src={logo} alt="logo" />
            <Box sx={{
              marginLeft :'10px',
            }}>
                <ThemeProvider theme={interFont}>
                {/* <CssBaseline /> */}
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#7E3E98',
                    letterSpacing: 1,
                    fontFamily:'inter',

                  }} >EASYTRADE</Typography>
              </ThemeProvider>

              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#293D9B',
                  letterSpacing: 1,
                  fontFamily:'Arial'

                }}


              >ONLINE SHOP & MORE</Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <img src={logo} alt="logo" /> */}
          <ThemeProvider theme={interFont}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              color: '#7E3E98',
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: 'none'
            }}
          >
            EASYTRADE
          </Typography>
          </ThemeProvider>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  page[0] && navigate('/');
                  console.log(page)
                }}
                sx={{ my: 2, color: '#272C2E', display: 'block', fontSize: '15px', fontWeight: 500, textTransform: 'none' }}
              >
                {page}
              </Button>
            ))}
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
          {/* {token ? (
            <Button
              onClick={() => localStorage.removeItem('api_token')}
              sx={{
                width: { xl: '10%', lg: '20%' },
                height: '30px',
                padding: '10px',
                backgroundColor: '#D351B0',
                borderRadius: '38px',
                fontSize: '16px',
                textAlign: 'center',
                fontWeight: 600,
                lineHeight: '29.98px',
                color: '#FFFFFF',
                ml: 3,
                ':hover': { backgroundColor: '#D351B0' },
                textTransform: 'none'
              }}
            >
              {t('signout.title')}
            </Button>
          ) : ( */}
          <Button
            onClick={() => navigate('/login')}
            sx={{
              width: { xl: '10%', lg: '20%' },
              height: '30px',
              padding: '10px',
              backgroundColor: '#5D449B',
              borderRadius: '38px',
              fontSize: '16px',
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: '29.98px',
              color: '#FFFFFF',
              ml: 3,
              ':hover': { backgroundColor: '#5D449B' },
              textTransform: 'none'
            }}
          >
            {t('signin.title', { framework: 'React' })}
          </Button>
          {/* )} */}
          <Divider orientation="vertical" flexItem />
          <LanguageIcon
            height="22px"
            width="22px"
            style={{ marginRight: '8%', color: '#272C2E' }}
            onClick={() => {
              const currentLanguage = i18n.language;
              const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
              i18n.changeLanguage(newLanguage);
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
