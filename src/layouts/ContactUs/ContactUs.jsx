import { Typography, Container, TextField, Button, TextareaAutosize, Input } from "@mui/material";
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
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";

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

  const validationSchema = Yup.object({
    first_name: Yup.string().required("لا يمكن لهذا الحقل ان يكون فارغاً"),
    last_name: Yup.string().required("لا يمكن لهذا الحقل ان يكون فارغاً"),
    email: Yup.string()
      .email("Invalid email address")
      .required("لا يمكن لهذا الحقل ان يكون فارغاً"),
    message: Yup.string().required("لا يمكن لهذا الحقل ان يكون فارغاً"),
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    
    console.log("Form values:", values);
    try {
      
      const response = await fetch("https://easytradyapi.shop/core/contact-us/", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        
        console.log("Form submitted successfully");
        resetForm();
        setSnackbarOpen(true);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setSubmitting(false);
    }
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
            textAlign: "center", // Center content vertically
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
              alignItems: "center", // Center content horizontally
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
                  <Formik
                    initialValues={{
                      first_name: "",
                      last_name: "",
                      email: "",
                      message: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      
                      handleSubmit(values, { setSubmitting, resetForm });
                    }}>
                    <Form>
                      <StyledForm sx={{ width: "100%" }}>
                        <Grid container>
                          <Grid item xs={12} sx={{ textAlign: "end" }}>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500, fontFamily: "Cairo" }}
                            >
                              الأسم الأول
                            </Typography>
                            <Field
                              type="text"
                              name="first_name"
                              as={TextField}
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
                              }}/>
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              style={{
                                color: "red",
                                fontFamily: "Cairo",
                                fontSize: "12px",
                                textAlign: "right",
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ textAlign: "end" }}>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 500, fontFamily: "Cairo" }}
                            >
                              الأسم الثاني
                            </Typography>
                            <Field
                              type="text"
                              name="last_name"
                              as={TextField}
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
                            />
                            <ErrorMessage
                              name="last_name"
                              component="div"
                              style={{
                                color: "red",
                                fontFamily: "Cairo",
                                fontSize: "12px",
                                textAlign: "right",
                              }}
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
                        <Field
                          type="text"
                          name="email"
                          as={TextField}
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
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{
                            color: "red",
                            fontFamily: "Cairo",
                            fontSize: "12px",
                            textAlign: "right",
                          }}
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
                          <Field
                            type="text"
                            name="message"
                            as={TextareaAutosize}
                            minRows={4}
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
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            style={{
                              color: "red",
                              fontFamily: "Cairo",
                              fontSize: "12px",
                              textAlign: "right",
                            }}
                          />
                        </Box>
                        <Button
                          type="submit"
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

                        <Snackbar
                          open={snackbarOpen}
                          autoHideDuration={10000} 
                          onClose={() => setSnackbarOpen(false)}
                          message="تم إرسال الرسالة"
                        />
                      </StyledForm>
                    </Form>
                  </Formik>
                </Container>
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
