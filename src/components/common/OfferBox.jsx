import { Box, Container, Grid, InputAdornment, Typography } from "@mui/material";
import React from "react";
import AddProductTitle from "./AddProductTitle";
import InputField from "./TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOffer from "../../assets/images/DeleteOffer.svg";
import image from "../../assets/images/Avatar.png";
import SelectValue from "./SelectValue";
import SelectValuePrecentage from "./SelectValuePrecentage";

// eslint-disable-next-line react/prop-types
const OfferBox = ({ title,discount,value,onChange }) => {
  return (
    <Box sx={{ borderRadius: "8px", background: "#fff",width:'100%',pb:'12px' }}>
      <AddProductTitle title={title} />
      <Container sx={{display:'flex',gap:'20px',flexDirection:'column',mt:'20px'}}>
        {Boolean(discount)&&
        <SelectValuePrecentage
        variant={'outlined'}
        label={'Discount'}
        
        />
        }
        <InputField
          variant="outlined"
          placeholder={"Type here…"}
          label="Choose product under the offer"
          value={value}
          onChange={onChange}
          
          sx={{ width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{height:'16px',width:'16px'}}/>
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Grid item>
            <Grid container>
              
              <Grid md={1.5}>
                <img src={image} alt="product" style={{ width: "44px", height: "44px" }} />
              </Grid>
              <Grid md={9.5}>
                <Typography
                  sx={{
                    color: " #191B1C",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  HollyHOME Teddy Bear Plush Giant Teddy Bears Stuf
                </Typography>
              </Grid>
              <Grid md={1}>
                <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                <img src={DeleteOffer} alt="delete" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default OfferBox;
