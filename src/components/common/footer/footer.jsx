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

        }}
      >
        <Grid
          overflow="hidden"
          container
        >
          <Grid item xs={12} md={6} lg={3}>
            <Item sx={{ fontSize: "30px", fontWeight: 700, boxShadow: "none", bgcolor: "#F9F9FF", fontFamily:'Cairo' ,bgcolor:'#ffffff',}}>
              اشترك ليصلك كل جديد
            </Item>
            <Box
              sx={{
                display: "flex",
                bgcolor:'#ffffff',
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                borderRadius: "24px",
                textAlign: "end !important",

              }}
            >
              <ButtonBase
                sx={{ bgcolor: "#5D449B", color: "#faf8f9", padding: "10px", borderRadius: "12px", fontFamily:'Cairo' }}
              >
                ارسال
              </ButtonBase>
              <InputBase
                placeholder="ادخل البريد الالكتروني"
                sx={{
                  bgcolor:'#F9F9FF !important',
                  textAlign: "center !important",
                  border: "none",
                }}
                htmlFor="outlined-adornment-email-register"
              />
            </Box>
          </Grid>
          <Grid item  xs={12} md={6} lg={3}>
            <Item sx={{ fontSize: "30px", fontWeight: 700, boxShadow: "none", bgcolor: "#ffffff", fontFamily:'Cairo' }}>
              الرقم الضريبي
            </Item>
            <Item sx={{ boxShadow: "none", bgcolor: "#ffffff", fontFamily:'Cairo' }}> 1123453456678</Item>
          </Grid>
          <Grid item  xs={12} md={6} lg={3}>
            <Item sx={{ fontSize: "30px", fontWeight: 700, boxShadow: "none", bgcolor: "#ffffff", fontFamily:'Cairo' }}>
              السجل التجاري
            </Item>
            <Item sx={{ boxShadow: "none", bgcolor: "#ffffff", fontFamily:'Cairo' }}>112345678</Item>
          </Grid>
          <Grid item  xs={12} md={6} lg={3}>
            <Item sx={{ boxShadow: "none", bgcolor: "#ffffff" }}>
              <img src={logo} alt="logo" />
              <Box sx={{ display: "flex", paddingTop: "30px", bgcolor: "#ffffff", justifyContent: 'center'}}>
                <Box
                  component="img"
                  sx={{ width: "10%", paddingLeft: "3px", bgcolor: "##ffffff" }}
                  src={face}
                ></Box>
                <Box
                  component="img"
                  sx={{ width: "10%", paddingLeft: "3px", bgcolor: "#ffffff" }}
                  src={insta}
                ></Box>
                <Box
                  component="img"
                  sx={{ width: "10%", paddingLeft: "3px", bgcolor: "#ffffff" }}
                  src={linkedin}
                ></Box>
                <Box
                  component="img"
                  sx={{
                    width: "10%",
                    borderRadius: "10px",
                    paddingLeft: "3px",
                    bgcolor: "#ffffff",
                  }}
                  src={x}
                ></Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Divider sx={{ alignSelf: "center", width: "100%" }} orientation="horizontal" flexItem />

        <Box sx={{ display: "flex", justifyContent: "center", my: "30px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#9795B5",
              textAlign: "center",
              fontFamily:'Cairo'
            }}
          >
            Copyright © 2023 Easytrade | All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
