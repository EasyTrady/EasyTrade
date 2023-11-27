/* eslint-disable react/prop-types */
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import rectangleShape from "../../assets/images/shapes/Frame 41366.png";
import circleShape from "../../assets/images/shapes/Frame 41363.png";
import BG from "../../assets/images/shapes/BG.png";
import upload from "../../assets/images/upload.svg";
import SoftBox from "components/SoftBox";
import { TextTitle } from "styles/style";
const BannerShape = ({product_images,onChange}) => {
  const [images,setImages]=useState([])
    const inputRef = useRef();
    const handlePaperClick = (e) => {
      inputRef.current.click();
    };
    const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      //   setImageFile(file);
      reader.onload = () => {
        setAvatarUrl(reader?.result);
      };
      reader.readAsDataURL(file);
      onChange(event.target.files[0]);
    };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px"}}>
    <SoftBox
      sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5, py: "24px" }}
    >
      <Container>
        <TextTitle>Banner Shape</TextTitle>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "24px",width:'100%',mt:'16px' }}>
        <img src={circleShape} alt="circular" onClick={handlePaperClick}/>
          <img src={rectangleShape} alt="rec"  onClick={handlePaperClick}/>
          <input
              multiple
              id="profile_image"
              name="profile_image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
        </Box>
      </Container>
    </SoftBox>
    <SoftBox
      sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5, py: "24px" }}
    >
      <Container sx={{ display: "flex", flexDirection: "row", gap: "24px"}}> 
        <Box >
          <img src={BG} alt="banner"/>
        </Box>
      <Box>
        <Button sx={{
          width: '100%',
          height: '40px',
          padding: '0px 24px 0px 24px',
          borderRadius: '12px',
          gap:' 8px',
          border: '1.5px solid #5D449B',
          background:'#FFFFFF',
          display: "flex", 
          flexDirection: "row",
          alignItems:"center",
          justifyContent:'center',
           gap: "24px",
           color: '#5D449B',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px'
        }}>
          <img src={upload} alt='upload'/>
          Upload banner image 
        </Button>
        <Typography component={'span'} sx={{color: '#191B1C',
fontFamily: 'Inter',
fontSize: '14px',
fontWeight: 400,
lineHeight: '10px'}}>Remember:</Typography>
        <Typography component={'span'} sx={{color: '#626C70',
fontFamily: 'Inter',
fontSize: '14px',
fontWeight: 400,
lineHeight: '10px'}}>
  For best results, use an image at least 200px by 200px in .jpg or .png format
</Typography>
      </Box>
      </Container>
    </SoftBox>
    </Box>
  );
};

export default BannerShape;
