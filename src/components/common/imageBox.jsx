import { Box } from '@mui/material';
import SoftAvatar from 'components/SoftAvatar';
import SoftButton from 'components/SoftButton';
import React from 'react'
import productImage from '../../assets/images/ivana-square.jpg'
// eslint-disable-next-line react/prop-types
const ImageBox = ({main_image,onChange}) => {
    const [mainImage, setMainImage] = React.useState(null);
  const handleAvatarChange = (event) => {
    console.log(event.target.files[0]);
    onChange(event.target.files[0])
    const file = event.target.files[0];
    const reader = new FileReader();
    //   setImageFile(file);
    
    reader.onload = (e) => {
      setMainImage(reader.result);
     
    };
    reader.readAsDataURL(file);
   
  };
 console.log(mainImage);
  return (
    <>
     {/* <Box sx={{ width: '100%',my:"24px"}}>
              
              <SoftButton
              sx={{backgroundColor:`#3C83C4 !important`}}
                variant="contained"
                onClick={() => {
                  document.getElementById('profile_image').click();
                }}
              >
                Choose your picture here
              </SoftButton>
            
          </Box> */}
          <Box sx={{ width: '30%', border:` 1px solid #d5d5d5 }`,borderRadius: `12px`}}>
            {/* view image selected */}
            
              {mainImage ? (
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                  <img
                    src={mainImage || productImage}
                    alt="profile_image"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: `12px  12px 0px 0px `
                    }}
                  />
                </Box>
              ) : (
                <Box
                  component={'img'}
                  src={mainImage || productImage}
                  alt="image"
                  sx={{ width: '100%', height: '100%' , borderRadius: `12px  12px 0px 0px `
                }}
                  // sx={{ height: "50%", width: "60%" }}
                />
              )}
            
            <input
              id="profile_image"
              name="profile_image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <Box
              sx={{
                width: '100%',
                p: 1,
                border: '#d5d5d5',
                backgroundColor: '#d5d5d5',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                borderRadius: `0px 0px 12px  12px `

              }}
            >
              {/* <SoftAvatar  sx={{ backgroundColor: '#fff', p: 1, height: '34px', width: '34px' }}>
                <DeleteIcon sx={{ color: 'red', zIndex: 1000 }} />
              </SoftAvatar> */}
              <SoftButton 
              onClick={() => {
                document.getElementById('profile_image').click();
              }}
              sx={{ fontSize: '10px' }}>Main product image</SoftButton>
            </Box>
          </Box>
    </>
  )
}

export default ImageBox