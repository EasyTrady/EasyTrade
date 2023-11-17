/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import React from 'react'
import AddProductTitle from './AddProductTitle'
import image from '../../assets/images/icons/image.svg'
const ImageOffer = ({title}) => {
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      //   setImageFile(file);
      reader.onload = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };
  return (
    <Box sx={{ borderRadius: "8px", background: "#fff",width:'100%',pb:'20px' }}>
    <AddProductTitle title={title} />
    <Box sx={{ display:'flex',
           alignItems:'center',
           justifyContent:'center',}}>
            {avatarUrl?<img src={avatarUrl} style={{height:'186px',width:'100%',borderRadius:'8px'}}/>:
            <Box sx={{width:'96%',mx:'auto',mt:'20px',border:'2px dashed #E5E7E8',borderRadius:'8px', display:'flex',alignItems:'center',
            justifyContent:'center',}}>
    <Box sx={{width: '149px',
           height: '186px',
           display:'flex',
           borderRadius:'8px',
           alignItems:'center',
           justifyContent:'center',
           gap:'12px',
           flexDirection:'column',
           }}>
             <input
                id="profile_image"
                name="profile_image"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
             <img src={image} alt='image'/>
               <Typography sx={{color: '#626C70',
           textAlign: 'center',
           fontFamily: 'Inter',
           fontSize: '14px',
           fontWeight: 400,
           lineHeight: '20px'}}>
               Drop your image here , or  
               <Typography
               component={'span'}
               sx={{color: ' #005CE8',
           fontFamily: 'Inter',
           fontSize: '14px',
           fontWeight: 500,
           lineHeight: '20px',
           cursor:'pointer'
        }}
           onClick={() => {
            document.getElementById("profile_image").click();
          }}
           >select click to browse</Typography>
               </Typography>
           </Box>
           </Box>
           }
    </Box>
    </Box>
  )
}

export default ImageOffer