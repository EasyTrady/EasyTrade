/* eslint-disable react/prop-types */
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import rectangleShape from "../../assets/images/shapes/Frame 41366.png";
import circleShape from "../../assets/images/shapes/Frame 41363.png";
import BG from "../../assets/images/shapes/BG.png";
import Rec from "../../assets/images/shapes/BG (1).png";
import upload from "../../assets/images/upload.svg";
import SoftBox from "components/SoftBox";
import { TextTitle } from "styles/style";
import { UploadButton } from "styles/productStyle";
import { CircleBanner } from "styles/productStyle";
import { RectangleBanner } from "styles/productStyle";
const BannerShape = ({ banner, onChange }) => {
  const [images, setImages] = useState(null);
  const [shape, setShape] = useState(false);
  const [rectangle, setRectangle] = useState(false);
  const inputRef = useRef();
  const handlePaperClick = (e) => {
    inputRef.current.click();
  };
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    //   setImageFile(file);
    reader.onload = () => {
      setImages(reader?.result);
    };
    reader.readAsDataURL(file);
    onChange(event.target.files[0]);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SoftBox
        sx={{ background: "#FFFFFF", borderRadius: "8px", width: "100%", mt: 2.5, py: "24px" }}
      >
        <Container>
          <TextTitle>Banner Shape</TextTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
              width: "100%",
              mt: "16px",
            }}
          >
            {shape ? (
              <CircleBanner>Circular Banner</CircleBanner>
            ) : (
              <img
                src={circleShape}
                alt="circular"
                style={{ width: "100px", width: "100px" }}
                onClick={() => {
                  setShape(true);
                  setRectangle(false);
                }}
              />
            )}
            {rectangle ? (
              <RectangleBanner>Rectangular Banner</RectangleBanner>
            ) : (
              <img
                src={rectangleShape}
                alt="rec"
                style={{ width: "355px", height: "100px" }}
                onClick={() => {
                  setRectangle(true);
                  setShape(false);
                }}
              />
            )}
          </Box>
        </Container>
      </SoftBox>
      {shape||rectangle?
      <SoftBox
        sx={{ background: "#FFFFFF", borderRadius: "8px", height: "100%", mt: 2.5, py: "24px" }}
      >
        <Container sx={{ display: "flex",flexWrap:shape?'noWrap':"wrap", gap: "24px" }}>
          <Box>
            {shape && (
              <img src={images ? images : BG} alt="banner" style={{ borderRadius: "24px",height: '152px',width: '152px' }} />
            )}
            {rectangle && (
              <img src={images ? images : Rec} alt="banner" style={{ borderRadius: "24px" ,width: '464px',height: '152px'}} />
            )}
          </Box>
          <Box>
            <input
              id="images_product"
              type="file"
              accept="/*"
              ref={inputRef}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <UploadButton onClick={handlePaperClick}>
              <img src={upload} alt="upload" />
              Upload banner image
            </UploadButton>
            <Typography
              component={"span"}
              sx={{
                color: "#191B1C",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
               
              }}
            >
              Remember:
            </Typography>
            <Typography
              component={"span"}
              sx={{
                color: "#626C70",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
               
              }}
            >
              For best results, use an image at least 200px by 200px in .jpg or .png format
            </Typography>
          </Box>
        </Container>
      </SoftBox>:<></>}
    </Box>
  );
};

export default BannerShape;
