/* eslint-disable react/prop-types */
import { Parser } from "html-to-react";

import { Box, Container, Divider, Grid, Typography, createTheme, responsiveFontSizes } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSubScribtion, TitleText } from "../../../styles/style";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Subscribtion } from "store/pages/subscribition";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";

const SubscribeCard = ({ type }) => {
  const [isHovering, setIsHovering] = useState(-1);
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { subscribtion } = useSelector((state) => state.subscribtion);
  useEffect(() => {
    dispatch(Subscribtion(type));
  }, []);

  const handleMouseOver = (i) => {
    setIsHovering(i);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(subscribtion);
    // console.log('run');
    if (subscribtion.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [subscribtion]);

  const boxStyle = {
    width:'100%',
    mx: "auto",
    overFlow: "hidden",
    display: "flex !important",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: { xs: "center", md: "stretch" }
  };
  const cardStyle = {
    position: "relative",
    width: {sm: '100%', xs: "80%", md: "60%", lg: "20%", xl: "20%" },
    margin: "0 0 15px",
    padding: "10px",
    boxShadow:
      "0px 0.796192px 2.38858px -0.875px rgba(0, 0, 0, 0.067), 0px 2.41451px 7.24352px -1.75px rgba(0, 0, 0, 0.067), 0px 6.38265px 19.148px -2.625px rgba(0, 0, 0, 0.06), 0px 20px 60px -3.5px rgba(0, 0, 0, 0.03)",
    backgroundColor: "#FFFFFF01",
    borderRadius: "20px",
    // px: "24px",
    ":hover": {
      cursor: "pointer",
      border: " 2px solid #5D449B",
      transition: "1s fade-in",
      ".MuiButton-root": {
        backgroundColor: "#5D449B",
        color: "#ffffff",
      },
      ".MuiSvgIcon-root": {
        color: "black",
      },
    },
  };
  const PriceStyle = {
    fontSize: "54px",
    fontWeight: 700,
    fontFamilly: "Inter",
    letterSpacing: "-3px",
    lineHeight: "54px",
    mt: "22px",
  };
  const offerStyle = {
    fontSize: "16px",
    fontWeight: 400,
    color: "#5D449B",
    lineHeight: "29.98px",
    mb: "11px",
  };

  const linkStyle = {
    color: "#5D449B",
    fontSize: "14px",
    lineHeight: "26.24px",
    fontWeight: 500,
    letterSpacing: "-0.5px",
    justifyContent: "center",
    display: "flex",
    my: "5px 20px",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Container>
      
        <Box sx={boxStyle}>
          <Box sx={{width:'100%'}}>
          <Slider {...settings} >
        {isLoading
          ? [1, 2, 3, 4].map((item, indx) => (
              <Skeleton key={item + indx} variant="rectangle" sx={{height:'480px', color:'#8BB3E8'}} />
            ))
          : subscribtion?.map((card, i) => {
            
              return (
                  <Box
                  xs={12} md={6} lg={4} 
                  sx={cardStyle}
                  key={`${card.id} ${i}`}
                  onMouseOver={() => handleMouseOver(i)}
                  onMouseOut={handleMouseOut}
                >
                  <TitleText sx={{fontFamily:'Cairo', fontWeight:600, fontSize:'22px', lineHeight:'33px', textAlign: "right" }}>{card.name}</TitleText>
                  {card.hasOwnProperty.call("offer") && isHovering === i && (
                    <Typography sx={offerStyle}>{card.offer}</Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "end",
                      justifyContent: "end",
                    }}
                  >
                    <Typography sx={{fontFamily:'Cairo', fontWeight:600, fontSize:'14px', lineHeight:'21px'}}>شهريا/</Typography>
                    <Typography variant="h3" margin={0} sx={PriceStyle}>
                      ${card.price}
                    </Typography>
                  </Box>
                  
                  <ButtonSubScribtion
                    onClick={() => {
                      navigate("/authentication/sign-up", { state: { subscribtionId: card?.id } });
                    }}
                    sx={{fontFamily:'Cairo', fontWeight:600, fontSize:'16px', lineHeight:'29.98px'}}
                  >
                    {t("chooseplan.title")}
                  </ButtonSubScribtion>
                  <Divider width="90%" sx={{ mx: "auto", my: "18px" }} />
                  <Typography sx={{ fontFamily:'Cairo', fontWeight:400, fontSize:'18px', lineHeight:'30px', textAlign: "start", margin: "20px 0" }}>
                    {Parser().parse(card.description)}
                  </Typography>
                  
                </Box>
                
              );
            })}
            </Slider>
          </Box>
        </Box>
      
    </Container>
  );
};

export default SubscribeCard;



// const Card = [
  //   {
  //     id: 1,
  //     title: "Basic",
  //     decription: "Perfect for Growing Businesses on a Budget",
  //     offer: "Start 14 days free trail",
  //     price: "$200",
  //     landing: {
  //       icon: <CheckCircleIcon />,
  //       address: "Landing Page",
  //     },
  //     responsive: {
  //       icon: <CheckCircleIcon />,
  //       address: "Responsive designs",
  //     },
  //     domain: {
  //       icon: <CheckCircleIcon />,
  //       address: "Custom domain name",
  //     },
  //     support: {
  //       icon: <CheckCircleIcon />,
  //       address: "24 hours Support",
  //     },
  //     button: "Choose Plan",
  //     link: "See details",
  //   },
  //   {
  //     id: 2,
  //     title: "Pro",
  //     decription: "Advanced Features for High-Performing Businesses",
  //     offer: "Start 14 days free trail",
  //     price: "$500",
  //     landing: {
  //       icon: <CheckCircleIcon />,
  //       address: " Pro landing Page",
  //     },
  //     responsive: {
  //       icon: <CheckCircleIcon />,
  //       address: "Product banners",
  //     },
  //     domain: {
  //       icon: <CheckCircleIcon />,
  //       address: "Chats",
  //     },
  //     support: {
  //       icon: <CheckCircleIcon />,
  //       address: "Sales management",
  //     },
  //     button: "Choose Plan",
  //     link: "See details",
  //   },
  //   {
  //     id: 3,
  //     title: "Enterprise",
  //     decription: "Collaboration Tools for Large Organizations",
  //     offer: "Start 14 days free trail",
  //     price: "$800",
  //     landing: {
  //       icon: <CheckCircleIcon />,
  //       address: "Pro landing page",
  //     },
  //     responsive: {
  //       icon: <CheckCircleIcon />,
  //       address: "Coupons links",
  //     },
  //     domain: {
  //       icon: <CheckCircleIcon />,
  //       address: "Affiliate system",
  //     },
  //     support: {
  //       icon: <CheckCircleIcon />,
  //       address: "Payment Gateways",
  //     },
  //     button: "Choose Plan",
  //     link: "See details",
  //   },
  //   {
  //     id: 4,
  //     title: "Vip",
  //     decription: "Ideal for Small Businesses and Solo Entrepreneurs",
  //     price: "$1000",
  //     landing: {
  //       icon: <CheckCircleIcon />,
  //       address: "Pro landing page",
  //     },
  //     responsive: {
  //       icon: <CheckCircleIcon />,
  //       address: "POS",
  //     },
  //     domain: {
  //       icon: <CheckCircleIcon />,
  //       address: "Return management",
  //     },
  //     support: {
  //       icon: <CheckCircleIcon />,
  //       address: "Subscription",
  //     },
  //     button: "Choose Plan",
  //     link: "See details",
  //   },
  // ];

  // console.log(Card);
  // ....................................skeleton......................................