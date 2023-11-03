import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next'; 
import home from '../../../assets/images/homeimg.png';
// import Grid from '@mui/material/Grid';
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
// import Paper from '@mui/material/Paper';
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

// let list = [
//   { title: '150+', subTitle: 'Customer', color: '#FFF68F' },
//   { title: '8+', subTitle: 'Application', color: '#9DC5DB' },
//   { title: '100+', subTitle: 'Pages', color: '#B39DDB' }
// ];

const LandingSection = () => {
  const [t] = useTranslation('common');
  const sectionStyle = {
     marginTop: '48px',
    background:' linear-gradient(1.02deg, rgba(74, 153, 211, 0) -17.33%,#cde3f3 100%),linear-gradient(#4A99D3, #FFFFFF, #FFFFFF)',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  };
 
  return (
    <>
      <Box sx={sectionStyle}>
        {/* <Box sx={imgBoxStyle}>
          <img src={image} alt="animation" height={90} width={90} style={{ marginLeft: '30%', marginTop: '20%' }} />
          <img src={animationImg} alt="animation" height={48} width={48} style={{ marginLeft: '20%' }} />
        </Box> */}
                <Box component="img" sx={{ width: '50%', marginRight: '280px' ,    background:' linear-gradient(1.02deg, rgba(74, 153, 211, 0) -17.33%,#cde3f3 100%),linear-gradient(#4A99D3, #FFFFFF, #FFFFFF)',
}} src={home}></Box>

        <Box
          sx={{
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column',
              
            },
            justifyContent: 'space-between'
          }}
        >
          <Stack sx={{ pt: '10%', width: '100%', textAlign: 'center', mt: '10%'}}>
            <Typography
              sx={{
                fontSize: '25px',
                fontWeight: 900,
                lineHeight: '86.4px',
                 marginTop:'60px',
                color: '#03090d'
              }}
            >
              {t('aselateam.title', { framework: 'react' })}
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: '21.33px',
                color: '#616161',
                mt: '6.81px',
                px: '10px'
              }}
            >
              {t('ourteam.title', { framework: 'React' })}
            </Typography>

            <Stack
              gap={2}
              sx={{
                flexDirection: {
                  xl: 'row',
                  lg: 'row',
                  md: 'row',
                  sm: 'column',
                  xs: 'column'
                },
                flexWrap: 'wrap',
                mx: 'auto',
                width: '100%',
                mt: '37.19px'
              }}
            >
              {/* <TextField
                placeholder={t('enteremail.title', { framework: 'react' })}
                sx={{
                  bgcolor: '#EBEBEB',
                  borderRadius: '38px',
                  height: '52.39px',
                  width: { md: '55%', xs: '100%' },

                  '& fieldset': { border: 'none' }
                }}
              /> */}

              <Button
                sx={{
                  bgcolor: '#5D449B',
                  color: '#FFFFFF',
                  height: '9vh',
                  borderRadius: '10px',
                  textAlign: 'Center',
                  fontSize: '14px',
                  lineHeight: '22.4px',
                  fontWeight: 600,
                  marginLeft: '150px',
                  width: { md: '60%', xs: '100%' },
                  ':hover': {
                    bgcolor: '#5D449B'
                  }
                }}
              >
                {t('getforfree.title', { framework: 'react' })}
              </Button>
              <Typography sx={{color:'#8a2296', marginLeft: '150px',width: { xl:'100%',md: '100%', xs: '100%' },fontSize:'20px'}}>تجربة مجانية مدتها 14 يومًا</Typography>
            </Stack>
          </Stack>
        </Box>


        <Box component="img" sx={{ width: '25%', marginRight: '70px',mt:'48px' }} src={home}></Box>
      </Box>
      {/* <Box component="img" sx={{ width: '100%' }} src={wave}></Box> */}

      {/* grid component */}
      {/* <Container>
      
          <Grid container gap={4} sx={{ flexWrap: { md: 'nowrap', xs: 'wrap' , padding:'80px'} }}>
            {list.map((value) => (
              <Grid
                key={value.color}
                lg={4}
                md={4}
                xs={12}
                item
                sx={{
                  bgcolor: value.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '120px',
                  borderRadius: '12px',
                  p: '24px'
                }}
              >
                <Box sx={{bgcolor:"#FFFAFA" ,padding:'2px',borderRadius:"7px",opacity:'0.6'}}>
                  <WidgetsOutlinedIcon style={{ height: '30px', width: '35px',display:'flex', alignItems:'center' }} />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    fontFamily: 'cairo',
                    justifyItems: 'flex-end'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '36px',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignSelf: 'end',
                      fontFamily: 'sans-serif',
                      marginLeft: 'auto'
                      // flexDirection:'column'
                    }}
                  >
                    {value.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '30px',
                      fontWeight: 400,

                      fontFamily: 'sans-serif',
                      marginLeft: 'auto',
                      flexDirection: 'column'
                    }}
                  >
                    {value.subTitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
      

    
     
    </Container> */}
    </>
  );
};

export default LandingSection;
