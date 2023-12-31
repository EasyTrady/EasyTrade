import { Typography, Container, TextField, Button, TextareaAutosize, Input, FormControl, FormHelperText } from "@mui/material";
import React from "react";
import { useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CONTACTUS } from "data/api";
import useControls from "hooks/useControls";
import useRequest from "hooks/useRequest";
import Stack from '@mui/material/Stack';
import SoftInput from "components/SoftInput";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ContactUs() {
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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

  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Default to success
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // Reset Snackbar state when it is closed
    setOpenSnackbar(false);
    setSnackbarSeverity('success'); // Reset severity to default
    setSnackbarMessage('');
  };
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [islastNameFocused, setIslastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);

  
  const [contactUsRequest, contactUsResponce] =
        useRequest({
            path: CONTACTUS,
            method: "post",
        });

  const [{ controls, invalid, required }, { setControl, resetControls, validate, setInvalid }] = 
      useControls([
        {
          // control: "first_name", 
          value: "", 
          isRequired: true},
        {control: "last_name", value: "", isRequired: true},
        {
          control: "email", 
          value: "", 
          isRequired: true, 
          validations: [
          {
              test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "not valid email"
          },
          ]
        },
        {control: "message", value: "", isRequired: true}
      ]);
  
      

      const handleSubmit = () => {
        validate().then((output) => {
          if (!output.isOk) return;
      
          contactUsRequest({
            body: controls,
            onSuccess: (res) => {
              resetControls();
              console.log("Done");
      
              // Show success Snackbar
              setSnackbarSeverity("success");
              setSnackbarMessage("تم إرسال الرسالة !");
              setOpenSnackbar(true);
            },
            // Handle other cases if needed
          }).then((res) => {
            let response = res?.response?.data;
      
            // Check if the response contains errors
            if (response && response.errors) {
              // Extract error messages and display them in the Snackbar
              const errorMessages = Object.values(response.errors).flat();
              const errorMessage = errorMessages.join(', ');
      
              // Show error Snackbar
              setSnackbarSeverity("error");
              setSnackbarMessage(errorMessage);
              setOpenSnackbar(true);
            } else {
              setInvalid(response);
            }
          });
        });
      };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(180deg, #cde3f3 -0%, rgba(74, 153, 211, 0.00) 54.91%),#d4d2e300",
          paddingTop: "60px",
        }}
      >
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              color: "#6941C6",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "Cairo !important",
              marginTop: "60px",
            }}
          >
            تواصل معنا
          </Typography>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 600,
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
              fontWeight: 400,
              fontFamily: "Cairo",
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            نود أن نسمع منك. من فضلك قم بملء هذا النموذج أو أرسل لنا رسالة بالبريد الإلكتروني
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            marginBottom: "50px",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{
              justifyContent: "center",
              padding: "0 !important",
              marginTop: "16px",
              alignItems: "center",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                pt: "30px",
                maxWidth: {
                  xs: 600,
                  md: "none",
                },
                "@media only screen and (max-width: 766px)": {
                  margin: "0 20px",
                },
              }}
            >
              <Item
                sx={{
                  boxShadow: "none",
                  padding: "0 !important",
                  bgcolor: "transparent !important",
                }}
              >
                <Container sx={{ padding: "0 !important", bgcolor: "#FBFAFD" }}>
                  <FormControl>
                    <StyledForm sx={{ width: "100%" }}>
                      <Grid container>
                        <Grid item xs={12} sx={{ textAlign: "end" }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, fontFamily: "Cairo" }}
                          >
                            الأسم الأول
                          </Typography>
                          <SoftInput
                            type="text"
                            name="first_name"
                            value={controls?.first_name}
                            onChange={(e) => 
                              setControl('first_name', e.target.value)
                            }
                            onFocus={() => setIsFirstNameFocused(true)}
                            error={Boolean(invalid?.first_name)}
                            helperText={invalid?.first_name}
                            required={required.includes('first_name')}
                            fullWidth
                            margin="dense"
                            InputProps={{
                              placeholder: "الاسم الاول",
                              style: {
                                marginRight: 0,
                                display: "block",
                                marginLeft: "auto",
                                direction: "rtl",
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Cairo",
                              },
                            }}
                            autoFocus={isFirstNameFocused}
                            
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "end" }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: 500, fontFamily: "Cairo" }}
                          >
                            الأسم الثاني
                          </Typography>
                          <SoftInput
                            type="text"
                            name="last_name"
                            value={controls.last_name}
                            onChange={(e) => setControl('last_name', e.target.value)}
                            required={required.includes('last_name')}
                            onFocus={() => setIslastNameFocused(true)}
                            error={Boolean(invalid?.last_name)}
                            helperText={invalid?.last_name}
                            fullWidth
                            margin="dense"
                            InputProps={{
                              placeholder: "الاسم الثاني",
                              style: {
                                marginRight: 0,
                                display: "block",
                                marginLeft: "auto",
                                direction: "rtl",
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Cairo",
                              },
                            }}
                            autoFocus={islastNameFocused}
                          />
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          textAlign: "end",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Cairo",
                        }}
                      >
                        البريد الالكتروني
                      </Typography>
                      <SoftInput
                        type="text"
                        name="email"
                        value={controls.email}
                        onChange={(e) => setControl('email', e.target.value)}
                        onFocus={() => setIsEmailFocused(true)}
                        required={required.includes('email')}
                        error={Boolean(invalid?.email)}
                        helperText={invalid?.email}
                        fullWidth
                        margin="dense"
                        InputProps={{
                          placeholder: "example@eaytrade.com",
                          style: {
                            marginRight: 0,
                            display: "block",
                            marginLeft: "auto",
                            direction: "rtl",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Cairo",
                          },
                        }}
                        autoFocus={isEmailFocused}
                      />
                      <Typography
                        sx={{
                          textAlign: "end",
                          fontSize: "14px",
                          fontWeight: 500,
                          fontFamily: "Cairo",
                        }}
                      >
                        الرسالة
                      </Typography>
                      <Box sx={{ marginBottom: "10px" }}>
                        <TextareaAutosize
                          minRows={4}
                          type="text"
                          name="message"
                          value={controls.message}
                          onChange={(e) => setControl('message', e.target.value)}
                          required={required.includes('message')}
                          onFocus={() => setIsMessageFocused(true)}
                          error={Boolean(invalid?.message)}
                          helperText={invalid?.message}
                          placeholder="...الرسالة"
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
                          }}
                          autoFocus={isMessageFocused}
                          
                        />
                      </Box>
                      
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        <Button
                          onClick={() => {
                            handleSubmit();
                            handleClick();
                          }}
                          type="button"
                          variant="contained"
                          sx={{
                            bgcolor: "#5D449B",
                            color: "#faf8f9",
                            width: "100%",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: "Cairo",
                            ":hover": { bgcolor: "#5D449B" },
                          }}
                        >
                          ارسال رساله
                        </Button>
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                          </Alert>
                        </Snackbar>
                      </Stack>
                    </StyledForm>
                  </FormControl>
                </Container>
                {contactUsResponce.failAlert}
              </Item>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                maxWidth: { xs: 600, md: "none" },
                "@media only screen and (max-width: 766px)": {
                  margin: "0 20px",
                },
              }}
            >
              <Item
                sx={{
                  boxShadow: "none",
                  padding: "0 !important",
                  bgcolor: "transparent !important",
                }}
              >
                <div>
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12} sx={{ boxShadow: "none", textAlign: "right" }}>
                      <Typography variant="body1" sx={{ boxShadow: "none" }}>
                        <Box
                          component="img"
                          sx={{ borderRadius: "50%", width: "10%" }}
                          src={msg}
                        ></Box>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#2F2F30",
                          }}
                        >
                          الرسائل الالكترونيه
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "#616161",
                          }}
                        >
                          فريقنا الودود موجود هنا لمساعدتك
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            color: "#5D449B",
                            fontWeight: 700,
                            fontSize: "16px",
                          }}
                        >
                          +20 120020322
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12} sx={{ boxShadow: "none", textAlign: "right" }}>
                      <Typography variant="body1" sx={{ boxShadow: "none" }}>
                        <Box
                          component="img"
                          sx={{ borderRadius: "50%", width: "10%" }}
                          src={phone}
                        ></Box>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#2F2F30",
                          }}
                        >
                          الهاتف المحمول
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "#616161",
                          }}
                        >
                          السبت - الاربعاء 8 صباحا حتي ال 8 مساءًا
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            color: "#5D449B",
                            fontWeight: 700,
                            fontSize: "16px",
                          }}
                        >
                          +20 122239834
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12} sx={{ textAlign: "right" }}>
                      <Typography variant="body1" sx={{ boxShadow: "none" }}>
                        <Box
                          component="img"
                          sx={{ borderRadius: "50%", width: "10%" }}
                          src={email}
                        ></Box>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#2F2F30",
                          }}
                        >
                          البريد الالكتروني
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "#616161",
                          }}
                        >
                          فريقنا الودود موجود هنا لمساعدتك
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            color: "#5D449B",
                            fontWeight: 700,
                            fontSize: "16px",
                          }}
                        >
                          support@easytrade.com
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12} sx={{ boxShadow: "none", textAlign: "right" }}>
                      <Typography variant="body1" sx={{ boxShadow: "none" }}>
                        <Box
                          component="img"
                          sx={{ borderRadius: "50%", width: "10%" }}
                          src={location}
                        ></Box>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#2F2F30",
                          }}
                        >
                          المكتب
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "#616161",
                          }}
                        >
                          في انتظار حضورك
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Cairo",
                            color: "#5D449B",
                            fontWeight: 700,
                            fontSize: "16px",
                          }}
                        >
                          6th october , giza , cairo
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
