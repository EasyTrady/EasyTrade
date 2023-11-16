import { Grid, Hidden, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mac from "../../../assets/images/icons/Social Media Icon Square/MacBook Pro 16.png";
import sc1 from "../../../assets/images/icons/Social Media Icon Square/Desktop - 1 1.png";
import sc2 from "../../../assets/images/icons/Social Media Icon Square/Desktop - 1 3.png";

export default function CarouselComponent() {
  function SampleNextArrow(props) {
    // const { className, style, onClick } = props;
    // return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    // );
  }

  function SamplePrevArrow(props) {
    // const { className, style, onClick } = props;
    // return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "green" }}
    //     onClick={onClick}
    //   />
    // );
  }
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <Typography
        sx={{
          fontSize: "50px",
          fontWeight: 300,
          textAlign: "center",
          marginTop: "60px",
          marginBottom: "20px",
        }}
      >
        تجربة مطور سهلة
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: 200,
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        لقت جعلت EASYTRADE من السهل على المطورين من اي مستوى مهارة استخدام منتجاتهم
      </Typography>
      <Slider style={{ height: "35vh", overflow: "hidden" }} {...settings}>
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
      </Slider>
    </div>
  );
}