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
    return feature === 'desiredFeature';
  };

  useEffect(() => {
    dispatch(Subscribtion(type));
  }, [type]);

  const pricetTypeBtnTapped = (e) => {
    setType(e.target.getAttribute("aria-data-type"));
    console.log(type);
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

        <Container>
          <Box sx={{ justifyContent: "center" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <TableContainer
                component={Paper}
                sx={{ direction: "rtl", boxShadow: "none", bgcolor: "#f8f9fa" }}
              >
                <Table>
                  <TableBody>
                    {[
                      <Box
                        item
                        // position="fixed"
                        xs={2}
                        sx={{
                          padding: "16px",
                          borderColor: "#5D449B",
                          display: "block",
                          width: { xl: "90%", lg: "100%", md: "100%", xs: "100%", sm: "100%" },
                          // background: '#e2eff8'
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center"  }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "7px",
                              // border: "1px solid #5D449B",
                              borderRadius: "12px",
                              padding: "5px",
                              bgcolor: "#f8f9fa",
                              width: "fit-content",
                              flexDirection: 'column'
                            }}
                          >
                            <Item
                              sx={{
                                boxShadow: "none",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#272C2E",
                                bgcolor: "#f8f9fa",
                                fontFamily: "Cairo",
                                textAlign: 'center'
                              }}
                            >
                              قارن بين الخطط
                            </Item>
                            <Box sx={{display: 'flex', border: "2px solid #5D449B",borderRadius:'12px'}}>
                              <ButtonBase
                                aria-data-type="monthly"
                                onClick={pricetTypeBtnTapped}
                                sx={{
                                  borderRadius: "10px",
                                  padding: "5px 10px",
                                  // my: "30px",
                                  width: "fit-content",
                                  '.MuiTabs-indicator': {
                                    position:'unset !important',
                                    width:'0px !important'
                                    
                                      }}}
                              >
                                شهري
                              </ButtonBase>
                              <ButtonBase
                               
                                sx={{
                                  // margin: "0 20px",
                                  // padding: "10px 30px",
                                  padding: "5px 10px",
                                  border: "none !important",
                                     
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
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: 200,
                                    color: "#C02431",
                                    paddingTop: "5px",
                                    fontFamily: "Cairo",
                                  }}
                                >
                                  %وفر 14
                                </Typography>
                                
                              </ButtonBase>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex" ,marginRight:'auto'}}>
                            {subscribtion.map(({  type, price, name}) => (
                              <Grid>
                                <Grid item xs={2} sx={{ padding: "16px", bgcolor: "#f8f9fa" }}>
                                  <Item
                                    sx={{
                                      fontSize: "16px",
                                      fontWeight: 600,
                                      color: "#272C2E",
                                      boxShadow: "none",
                                      bgcolor: "#f8f9fa",
                                      fontFamily: "Cairo",
                                    }}
                                  >
                                    {name}
                                  </Item>
                                  <Item
                                    sx={{
                                      fontSize: "25px",
                                      fontWeight: 800,
                                      boxShadow: "none",
                                      bgcolor: "#f8f9fa",
                                      fontFamily: "Cairo",
                                    }}
                                  >
                                    ${price}
                                  </Item>
                                  <Item
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: 400,
                                      boxShadow: "none",
                                      fontFamily: "Inter",
                                      bgcolor: "#f8f9fa",
                                      fontFamily: "Cairo",
                                    }}
                                  >
                                    {type}/
                                  </Item>
                                  <ButtonBase
                                    sx={{
                                      bgcolor: "#5D449B",
                                      borderRadius: "12px",
                                      width: "150px",
                                      boxShadow: "none",
                                      color: "#faf8f9",
                                      padding: "10px",
                                      fontFamily: "Cairo",
                                    }}
                                  >
                                    ابدأ تجربتك
                                  </ButtonBase>
                                </Grid>
                              </Grid>
                              // </TableRow>
                            ))}
                          </Box>
                        </Box>
                      </Box>,
                    ]}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Typography
              sx={{
                color: "#272C2E",
                textAlign: "right",
                display: "bolck",
                fontSize: "20px",
                fontWeight: 700,
                py:'16px',
                fontFamily: "Cairo",
              }}
            >
              المميزات الأساسية
            </Typography>
            {subscribtion.map(({ features }) => (

<TableContainer component={Paper} sx={{ direction: "rtl", width: "100%" }}>
<Table>
  <TableBody>
  {features.map((feature) => (
    
    <React.Fragment key={feature}>
      <TableRow key={feature} sx={{ textAlign: 'right', bgcolor: '#f8f9fa'}}>
       <TableCell sx={{textAlign: "right",width:'30%'}}>
        {feature}
        </TableCell>
        {subscribtion?.map((feat,index)=>(
          <TableCell key={feat} alignItems='center'><CheckCircleIcon sx={{ color: "#6495ed" }} /></TableCell>
        ))}
      </TableRow>
      {/* {featureIsPresent(feature) ? (
        <TableCell>
          
        </TableCell>
      ) : null} */}
    </React.Fragment>
  ))}
</TableBody>
         </Table>
         </TableContainer>

            ))}

        
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
