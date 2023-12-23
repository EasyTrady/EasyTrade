import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Typography,
  Button,
  styled,
  InputLabel,
  Divider,
  Input,
  InputBase,
  ButtonBase,
} from "@mui/material";
import logo from "../../../assets/images/icons/Social Media Icon Square/logo.svg";
import face from "../../../assets/images/icons/Social Media Icon Square/Facebook.png";
import insta from "../../../assets/images/icons/Social Media Icon Square/Instagram.png";
import linkedin from "../../../assets/images/icons/Social Media Icon Square/linkedin.png";
import x from "../../../assets/images/icons/Social Media Icon Square/x.jpg";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "16px",
  textAlign: "center",
  color: "secondary",
}));

export function Footer() {
  return (
    <Box
      sx={{
        borderTop: "1px solid #D4D2E3",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bgcolor:'#ffffff',
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          bgcolor:'#ffffff',
          justifyContent:'space-between'
        }}
      >
        <Grid
          overflow="hidden"
          container
          sx={{
            justifyContent:'space-between',
            flexDirection:{lg:'row-reverse', md:'row-reverse'}
          }}
        >
          <Grid item xs={12} sm={6} md={3} lg={3} sx={{padding:'16px'}}>
            <Item sx={{ boxShadow: "none", bgcolor: "#ffffff",padding:'16px 0' }}>
              <img src={logo} alt="logo" style={{ width: '11rem' }}/>
              <Box sx={{ display: "flex", padding: "10px 0", bgcolor: "#ffffff", justifyContent: 'center', alignItems:'center'}}>
                <Typography sx={{fontSize:'30px', color:'#fff'}}>
                  <FacebookIcon sx={{bgcolor:'#3B5998', borderRadius:'4px', padding:'2px'}} />
                </Typography>
                <Typography sx={{fontSize:'31px', pl:'5px'}}>
                  <InstagramIcon sx={{background:
                    'linear-gradient(to bottom right , #405DE6, #833AB4, #E1306C, #FD1D1D, #F77737 35px)', borderRadius:'10px', color:'#fff'}} />
                </Typography>
                <Typography sx={{fontSize:'31px', pl:'5px'}}>
                  <TwitterIcon sx={{color:'#fff', bgcolor:'#1DA1F2', borderRadius:'7px', padding:'4px'}} />
                </Typography>
                <Typography sx={{fontSize:'31px', pl:'5px'}}>
                  <LinkedInIcon sx={{color:'#fff', bgcolor:'#0077B5', borderRadius:'7px', padding:'2px'}} />
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} sx={{padding:'16px'}}>
            <Item sx={{ fontSize: "20px", fontWeight: 600, boxShadow: "none", bgcolor: "#F9F9FF", fontFamily:'Cairo', color:'#2F2F30', textAlign:'right',padding:'16px 0'}}>
              اشترك ليصلك كل جديد
            </Item>
            <Box
              sx={{
                display: "flex",
                bgcolor:'#ffffff',padding:'16px 0',
                display: "flex",
                alignItems: "center",
                borderRadius: "24px",
                textAlign: "end !important",
              }}
            >
              <ButtonBase
                sx={{ bgcolor: "#5D449B", color: "#faf8f9", padding: '5px 18px', borderRadius: "12px", fontFamily:'Cairo', fontWeight:700, fontSize:'18px' }}
              >
                ارسال
              </ButtonBase>
              <InputBase
                placeholder="ادخل البريد الالكتروني"
                sx={{
                  bgcolor:'#F9F9FF !important',
                  textAlign: "center !important",
                  border: "none",
                  fontFamily: "Cairo",
                  fontSize:'16px',
                  fontWeight: 400,
                  direction: 'rtl'
                }}
                htmlFor="outlined-adornment-email-register"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={12} md={5} lg={5}  sx={{
            display:'flex'
          }}>
            <Grid item xs={6} md={6} lg={6} sx={{padding:'16px 0'}}>
              <Item sx={{ fontSize: "20px", fontWeight: 600, boxShadow: "none", color: "#2F2F30", fontFamily:'Cairo',padding:'16px 0' }}>
              الرقم الضريبي
              </Item>
              <Item sx={{fontSize:'18px', fontWeight: 400, boxShadow: "none", color: "#616161", fontFamily:'Cairo',padding:'16px 0' }}>1123453456678</Item>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sx={{padding:'16px 0'}}>
              <Item sx={{ fontSize: "20px", fontWeight: 600, boxShadow: "none", color: "#2F2F30", fontFamily:'Cairo',padding:'16px 0' }}>
                السجل التجاري
              </Item>
              <Item sx={{fontSize:'18px', fontWeight: 400, boxShadow: "none", color: "#616161", fontFamily:'Cairo',padding:'16px 0' }}>112345678</Item>
            </Grid>
          </Grid>
          
        </Grid>
        <Divider sx={{ alignSelf: "center", width: "100%" }} orientation="horizontal" flexItem />

        <Box sx={{ display: "flex", justifyContent: "center", my: "30px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#9795B5",
              textAlign: "center",
              fontFamily:'Cairo',
              fontWeight: 400,
              fontSize: '18px'
            }}
          >
            Copyright © 2023 Easytrade | All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
