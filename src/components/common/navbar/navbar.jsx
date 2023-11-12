import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import home from '../../../assets/images/icons/Social Media Icon Square/logo.svg';




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
    t('تواصل معنا', { framework: 'React' }),
    t('الصفات'),
    t('الباقات والأسعار'),
    t('الخدمات'),
    t('الرئيسية')
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
    const backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      const paddingVar = 20 - backgroundTransparacyVar * 20;
      const boxShadowVar = backgroundTransparacyVar * 0.1;
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
    <AppBar position="fixed" sx={{ background: '#cde3f3', boxShadow }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            padding: 0,
            '& hr': {
              mx: 1,
              color: '#7F7F7F'
              // my: 2,
            }
          }}
        >
              {/* <img src={logo} alt="logo" />
            <Box sx={{
              marginLeft :'10px',
            }}></Box> */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <LanguageIcon
                height="22px"
                width="22px"
                style={{ color: '#272C2E' }}
                onClick={() => {
                  const currentLanguage = i18n.language;
                  const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
                  i18n.changeLanguage(newLanguage);
                }}
              />
              <Divider sx={{ height: '50px' }} orientation="vertical" flexItem />

              <ButtonBase
                onClick={() => navigate('/login')}
                sx={{
                  padding: '10px',
                  backgroundColor: '#5D449B',
                  borderRadius: '12px',
                  fontSize: '16px',
                  textAlign: 'center',
                  fontWeight: 600,
                  // lineHeight: "29.98px",
                  color: '#FFFFFF',
                  width:{sm:'20%',lg:'80%',xl:'80%',md:'100%'}
                }}
              >
                {t('تسجيل الدخول', { framework: 'React' })}
              </ButtonBase>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    page[0] && navigate('/')|| page[4] && navigate('/contactus')||page[2] && navigate('/price')
                   
                  }}
                  sx={{
                    my: 2,
                    color: '#272C2E',
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 500,
                    textTransform: 'none'
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box component="img" src={home} sx={{width:{xs:'30%',sm:'30%',lg:'20%',xl:'20%',md:'20%'},marginLeft:'10px'}}/>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;