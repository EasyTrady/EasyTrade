import { Typography, Container, TextField, Button, TextareaAutosize } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import phone from "../../../src/assets/images/icons/Social Media Icon Square/Featured icon.png";
import msg from "../../../src/assets/images/icons/Social Media Icon Square/msg.png";
import location from "../../../src/assets/images/icons/Social Media Icon Square/location.png";
import email from "../../../src/assets/images/icons/Social Media Icon Square/email.png";
import { Footer } from "components/common/footer/footer";
import Navbar from "components/common/navbar/navbar";
export default function ContactUs() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const StyledForm = styled("form")`
    border: 1px solid #d4d2e3;
    border-radius: 8px;
    padding: 30px;
  `;
  return (
    <>
      <Navbar />

      <Typography
        sx={{
          textAlign: "center",
          color: "#6941C6",
          fontSize: "40px",
          fontWeight: 700,
          fontFamily: "Cairo !important",
        }}
      >
        تواصل معنا
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: 400,
          fontFamily: "Cairo",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        سهوله التواصل مع تيمنا الودود
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 200,
          fontFamily: "Cairo",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        نود أن نسمع منك. من فضلك قم بملء هذا النموذج أو أرسل لنا رسالة بالبريد الإلكتروني
      </Typography>
      <Box sx={{ flexGrow: 1, paddingTop: "40px", bgcolor: "#f8f9fa",marginBottom:'100px' }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={6}>
            <Item sx={{ bgcolor: "#f8f9fa", boxShadow: "none" }}>
              <Container>
                <StyledForm sx={{ bgcolor: "#faf8f8", width: "100%", height: "60vh" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="الاسم التاني"
                        fullWidth
                        margin="dense"
                        style={{ fontFamily: "Cairo !important", textAlign: "right" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="الاسم الاول"
                        fullWidth
                        margin="dense"
                        style={{
                          fontFamily: "Cairo",
                          marginRight: 0,
                          display: "block",
                          marginLeft: "auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField placeholder="البريد الالكتروني" fullWidth margin="dense" />
                  <TextareaAutosize
                    minRows={4}
                    placeholder="الرسالة"
                    style={{
                      width: "100%",
                      paddingBottom: "40px",
                      borderRadius: "10px",
                      fontFamily: "Cairo",
                      textAlign: "right",
                      marginLeft: "auto",
                      marginRight: 0,
                      display: "block",
                      paddingTop: "10px",
                      paddingRight: "10px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#5D449B",
                      color: "#faf8f9",
                      width: "100%",
                      borderRadius: "10px",
                      ":hover": { bgcolor: "#5D449B" },
                    }}
                  >
                    Submit
                  </Button>
                </StyledForm>
              </Container>
            </Item>
          </Grid>
          <Grid item xs={6} sx={{justifyContent:"flex-start"}}>
            <Item sx={{ bgcolor: "#f8f9fa", boxShadow: 'none' }}>
              <div>
                <Grid container spacing={2} >
                  <Grid item xs={6} sx={{ bgcolor: "#f8f9fa", boxShadow: "none",textAlign:'right'}}>
                    <Typography variant="body1" sx={{ boxShadow: "none",fontFamily:'Cairo',fontWeight:600,fontSize:'20px' }}>
                      <Box
                        component="img"
                        sx={{ bgcolor: "#80B7FF", borderRadius: "50%", width: "10%" }}
                        src={msg}
                      ></Box>
                      <p>الرسائل الالكترونيه</p>
                      <p>فريقنا الودود موجود هنا لمساعدتك</p>
                      <p style={{ color: "#5D449B" }}>+20 120020322</p>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ bgcolor: "#f8f9fa", boxShadow: "none",textAlign:'right'}}>
                    <Typography variant="body1" sx={{ boxShadow: "none",fontFamily:'Cairo',fontWeight:600,fontSize:'20px' }}>
                      <Box
                        component="img"
                        sx={{ bgcolor: "#80B7FF", borderRadius: "50%", width: "10%" }}
                        src={phone}
                      ></Box>
                      <p>الهاتف المحمول</p>
                      <p>السبت - الاربعاء 8 صباحا حتي ال 8 مساءًا</p>
                      <p style={{ color: "#5D449B" }}>+20 122239834</p>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ bgcolor: "#f8f9fa",textAlign:'right' }}>
                    <Typography variant="body1" sx={{ boxShadow: "none",fontFamily:'Cairo',fontWeight:600,fontSize:'20px' }}>
                      <Box
                        component="img"
                        sx={{ bgcolor: "#80B7FF", borderRadius: "50%", width: "10%" }}
                        src={email}
                      ></Box>
                      <p>البريد الالكتروني</p>
                      <p>فريقنا الودود موجود هنا لمساعدتك </p>
                      <p style={{ color: "#5D449B" }}>support@easytrade.com</p>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ bgcolor: "#f8f9fa", boxShadow: "none",textAlign:'right' }}>
                    <Typography variant="body1" sx={{ boxShadow: "none",fontFamily:'Cairo',fontWeight:600,fontSize:'20px' }}>
                      <Box
                        component="img"
                        sx={{ bgcolor: "#80B7FF", borderRadius: "50%", width: "10%" }}
                        src={location}
                      ></Box>
                      <p>المكتب</p>
                      <p>في انتظار حضورك</p>
                      <p style={{ color: "#5D449B" }}>6th october , giza , cairo</p>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
  
      <Footer />
    </>
  );
}
