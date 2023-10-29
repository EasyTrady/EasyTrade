import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import productImage from '../../../assets/images/home-decor-2.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import SoftButton from 'components/SoftButton';
import SoftAvatar from 'components/SoftAvatar';
// eslint-disable-next-line react/prop-types
const ProductImageDialog = ({ open, onClose }) => {
  // const [imageFile, setImageFile] = useState(null);
  let { palette } = useTheme();
  const customization = useSelector((state) => state.customization);
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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '50%', xs: '80%' },
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: `12px`
  };
  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'space-between',alignItems:'center', p:2, backgroundColor: '#d5d5d5',borderRadius: `12px`}}>
            <Typography sx={{fonSize:'18px',fontWeight:600}}> Images and video product</Typography>
            <CloseIcon onClick={onClose} />
          </Box>
          <Box sx={{ p: 2}}>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Product image
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, color: 'gray', fontSize: '10px' }}>
                Sizes that are not allowed (100px height * 250px width) are of the type (jpg, jpeg, png, gif) and do not exceed 5 megabytes
                per image, with a maximum of 10 images.
              </Typography>
            </Box>
            {/* button choose image */}
            <Box sx={{ width: '100%',my:"24px"}}>
              
                <SoftButton
                sx={{backgroundColor:`#3C83C4 !important`}}
                  variant="contained"
                  onClick={() => {
                    document.getElementById('profile_image').click();
                  }}
                >
                  Choose your picture here
                </SoftButton>
              
            </Box>
            <Box sx={{ width: '30%', border:` 1px solid #d5d5d5 }`,borderRadius: `12px`}}>
              {/* view image selected */}
              
                {avatarUrl ? (
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    <img
                      src={avatarUrl || productImage}
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
                    src={avatarUrl || productImage}
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
                  border: palette.grey[800],
                  backgroundColor: palette.grey[200],
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  borderRadius: `0px 0px 12px  12px `

                }}
              >
                <SoftAvatar  sx={{ backgroundColor: '#fff', p: 1, height: '34px', width: '34px' }}>
                  <DeleteIcon sx={{ color: 'red', zIndex: 1000 }} />
                </SoftAvatar>
                <Button sx={{ fontSize: '10px' }}>Main product image</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductImageDialog;
