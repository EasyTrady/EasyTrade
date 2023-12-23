import { Box, Typography } from "@mui/material";
 import React from "react";
 import mac from '../../../assets/images/icons/Social Media Icon Square/Macbook.svg'

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import mac from "../../../assets/images/icons/Social Media Icon Square/MacBook Pro 16.png";
// import sc1 from "../../../assets/images/icons/Social Media Icon Square/Desktop - 1 1.png";
// import sc2 from "../../../assets/images/icons/Social Media Icon Square/Desktop - 1 3.png";

export default function CarouselComponent() {
  // function SampleNextArrow(props) {
    // const { className, style, onClick } = props;
    // return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    // );
  

  // function SamplePrevArrow(props) {
    // const { className, style, onClick } = props;
    // return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "green" }}
    //     onClick={onClick}
    //   />
    // );
  
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  return (
    <div>
      <Box sx={{marginBottom:'100px',marginTop:'60px'}}>
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 500,
          textAlign: "center",
          marginTop: "60px",
          paddingTop: "100px",
          fontFamily:'Cairo',
          color:'#3D2D66',
          lineHeight:'52.5px'
        }}
      >
        تجربة مطور سهلة
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 400,
          textAlign: "center",
          marginTop: "18px",
          marginBottom: "30px",
          fontFamily:'Cairo',
          color:'#505050',
          lineHeight:'27px'
        }}
      >
        لقت جعلت EASYTRADE من السهل على المطورين من اي مستوى مهارة استخدام منتجاتهم
      </Typography>
      {/* <Slider style={{ height: "35vh", overflow: "hidden" }} {...settings}>
        <Grid xs={4}>
          <img src={sc2} height="100%" alt="" />
        </Grid>
        <Grid xs={4}>
          <img src={sc1} height="100%" alt="" />
        </Grid>
        <Grid xs={4}>
          <img src={mac} height="100%" alt="" />
        </Grid>
        <Grid xs={4}>
          <img src={sc2} height="100%" alt="" />
        </Grid>
        <Grid xs={4}>
          <img src={sc1} height="100%" alt="" />
        </Grid>
      </Slider> */}

     <Box  sx={{
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
              }}>
      <Box
              component="img"
              src={mac}
              width={"50%"}
            ></Box>
            </Box>
      </Box>
    </div>
  );
}
