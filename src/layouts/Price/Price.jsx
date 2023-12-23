/* eslint-disable react/jsx-key */
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  ButtonBase,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import Navbar from "components/common/navbar/navbar";
import { Footer } from "components/common/footer/footer";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Subscribtion } from "store/pages/subscribition";
import './Price.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Price() {
  const [isHovering, setIsHovering] = useState(-1);
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { subscribtion } = useSelector((state) => state.subscribtion);
  const [type, setType] = useState("monthly");

  const featureIsPresent = (feature) => {
    return feature === "desiredFeature";
  };

  useEffect(() => {
    dispatch(Subscribtion(type));
  }, [type]);

  const pricetTypeBtnTapped = (e) => {
    setType(e.target.getAttribute("aria-data-type"));
   
  };

  const staticFeatures = [
    "سيرفرات امنة",
    "دومين فرعي امن مجانا",
    "دعم فني على مدار الساعة",
    "صفحات هبوط احترافية",
    "تخطي صفحة السلة",
    "عد تنازلي للعروض",
    "خدمات اضافية في صفحة الدفع",
    "استيراد/تصدير الطلبات",
    "اسعار البيع بالجملة",
    "دردشة حية مع العملاء",
    "Full Control of mobile theme",
  ];

  

  return (
    <>
      <Navbar />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #cde3f3 -0%, rgba(74, 153, 211, 0.00) 54.91%),#d4d2e300",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: "#5D449B",
            fontSize: "16px",
            fontWeight: 600,
            marginTop: "40px",
            fontFamily: "Cairo",
          }}
        >
          {" "}
          الباقات والاسعار
        </Typography>
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 600,
            textAlign: "center",
            paddingTop: "10px",
            color: "#2F2F30",
            fontFamily: "Cairo",
          }}
        >
          خطط تسعير ميسورة التكلفة
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 400,
            textAlign: "center",
            paddingTop: "10px",
            color: "#667085",
            marginBottom: "30px",
            fontFamily: "Cairo",
          }}
        >
          {" "}
          صممت خصيصًا لتناسب جميع أنواع التجار قارن بين الميزات
        </Typography>

        <Container
          sx={{
            direction: "rtl",
            boxShadow: "none",
            overflowX: "auto",
          }}
        >
          <Box sx={{display:'flex'}}>
            <Grid container sx={{ marginTop:'45px' }}>
            <Grid lg={4} sx={{ justifyContent: "center", maxWidth:'100% !important' }}>
                  <Box >
                    <Item
                      sx={{
                        boxShadow: "none",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#272C2E",
                        fontFamily: "Cairo",
                        textAlign: "center",
                      }}
                    >
                      قارن بين الخطط
                    </Item>
                    <Box
                      sx={{
                        display: "flex",
                        border: "2px solid #5D449B",
                        borderRadius: "12px",
                        fontWeight: "Cairo",
                        fontWeight: 500,
                        lineHeight: "19.2px",
                        fontSize: "12px",
                      }}
                    >
                      <ButtonBase
                        aria-data-type="monthly"
                        onClick={pricetTypeBtnTapped}
                        sx={{
                          borderRadius: "10px",
                          padding: "5px 10px",
                          // my: "30px",
                          width: "fit-content",
                          fontFamily: "Cairo",
                          fontWeight: 500,
                          lineHeight: "19.2px",
                          fontSize: "12px",
                          ".MuiTabs-indicator": {
                            position: "unset !important",
                            width: "0px !important",
                          },
                        }}
                      >
                        شهري
                      </ButtonBase>
                      <ButtonBase
                        sx={{
                          // margin: "0 20px",
                          // padding: "10px 30px",
                          padding: "5px 10px",
                          border: "none !important",
                          fontFamily: "Cairo",
                          fontWeight: 500,
                          lineHeight: "19.2px",
                          fontSize: "12px",
                          "&.Mui-selected, &.Mui-selected:hover": {
                            color: "white !important",
                            backgroundColor: "#5D449B",
                            borderRadius: "12px",
                            border: "none !important",
                          },
                        }}
                      >
                        كل 3 شهور
                      </ButtonBase>
                      <ButtonBase
                        aria-data-type="annual"
                        onClick={pricetTypeBtnTapped}
                        sx={{
                          // margin: "0 20px",
                          // padding: "10px 30px",
                          padding: "5px 10px",
                          fontFamily: "Cairo",
                          fontWeight: 500,
                          lineHeight: "19.2px",
                          fontSize: "12px",
                          // border: "none !important",
                          "&.Mui-selected &.Mui-selected:hover": {
                            color: "white !important",
                            background: "#5D449B !important",
                            borderRadius: "12px",
                            // border: "none !important",
                          },
                        }}
                      >
                        سنوي
                        <Typography
                          aria-data-type="annual"
                          onClick={pricetTypeBtnTapped}
                          sx={{
                            fontSize: "12px",
                            fontWeight: 200,
                            color: "#C02431",
                            padding: "5px 5px",
                            fontFamily: "Cairo",
                          }}
                        >
                          %وفر 14
                        </Typography>
                      </ButtonBase>
                    </Box>
                  </Box>
                  <Grid sx={{ marginTop: "70px", display:'flex',flexDirection:'column' }}>
                    <Box sx={{ justifyContent: "center", textWrap:'nowrap' }}>
                      <Box>
                        <Typography
                          sx={{
                            color: "#272C2E",
                            textAlign: "right",
                            display: "bolck",
                            fontSize: "20px",
                            fontWeight: 700,
                            padding: "16px",
                            fontFamily: "Cairo",
                          }}
                        >
                          المميزات الأساسية
                        </Typography>
                      </Box>
                      <Box>
                        {staticFeatures.map((feature) => (
                          <Typography
                            sx={{
                              textAlign: "right",
                              borderBottom: "1px solid #D4D2E3",
                              fontFamily: "Cairo",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "18.4px",
                              color: "#272C2E",
                              padding: "16px 0px 16px 16px",
                            }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
            </Grid>
            <Grid lg={8} sx={{}}>
              <Grid container sx={{ display: "flex", flexWrap: "nowrap" }}>
                <Grid item sx={{ display: "flex", margin: "16px 0" }}>
                  {subscribtion.map(({ type, price, name, features }, index) => (
                    <Grid
                      key={index}
                      sx={{ display: "flex", flexDirection: "column", marginRight: "16px" }}
                    >
                      <Grid item xs={2} sx={{ }}>
                            <Item
                              sx={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#272C2E",
                                boxShadow: "none",
                                fontFamily: "Cairo",
                                textWrap: "nowrap",
                                padding: "0",
                                lineHeight: "33px",
                              }}
                            >
                              {name}
                            </Item>
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                              <Item
                                sx={{
                                  fontSize: "40px",
                                  fontWeight: 700,
                                  boxShadow: "none",
                                  fontFamily: "Cairo",
                                  lineHeight: "54px",
                                }}
                              >
                                ${price}
                              </Item>
                              <Item
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  boxShadow: "none",
                                  fontFamily: "Inter",
                                  padding: "0 0 13px 8px",
                                  lineHeight: "21px",
                                }}
                              >
                                /{type}
                              </Item>
                            </Box>
                            <ButtonBase
                              sx={{
                                bgcolor: "#5D449B",
                                borderRadius: "12px",
                                width: "150px",
                                boxShadow: "none",
                                padding: "10px",
                                fontFamily: "Cairo",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "29.98px",
                                color:'#fff'
                              }}
                            >
                              ابدأ تجربتك
                            </ButtonBase>
                      </Grid>
                      <Grid item sx={{ marginTop: "115px" }}>
                        {staticFeatures.map((feature, featureIndex) => (
                          <Box
                            key={featureIndex}
                            sx={{
                              textAlign: "center",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "50px"
                            }}
                          >
                            {features.includes(feature) ? (
                              <Box sx={{ color: "#6495ed",borderBottom: "1px solid #D4D2E3",width:'100%' }}>
                                <CheckCircleIcon  />
                              </Box>
                            ) : (
                              "-"
                            )}
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>

      </Box>
      <Footer />
    </>
  );
}
