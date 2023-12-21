/* eslint-disable prettier/prettier */
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../assets/images/animation_ln56x5ne.json';
import { Box, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const FakePege = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [enable, setEnable] = useState(true);
  const user = useSelector((state) => state.registration.user);
  const shop = useSelector((state) => state.registration.shop);
  const shop_name = localStorage.getItem('shop_name');
  const shop_url = localStorage.getItem('shop_url');
  const navigate = useNavigate();
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        // setProgress(10);
        // setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
      if (buffer > 100) {
        setEnable(false);
      }
    };
  });
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  //  const handleClick = () => {
    // if (shop_name) {
      // Delete old route
      // const path=`/${shop_name}/dashboard`
      // return <Navigate to={path}/>
  
      // Replace old route after a short delay
      // setTimeout(() => {
      //   const { replace } = navigate();
      //   replace(`/${shop_name}/dashboard`);
      // }, 100); // Adjust the delay time as needed
    // } else {
      // console.error('Invalid shop name');
    // }
  //  }
 
  return (
    <Box>
      <Box
        sx={{
          my: '48px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          gap: 4,
          width: '50%',
          borderRadius: '12px'
        }}
      >
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"sx={{width:"100%"}} /> */}
        <Box sx={{ width: '100%', p: 2, border: '1px solid #d5d5d5' }}>
          <a href={shop_url} style={{ textDecoration: 'none' }} hidden={enable}>
            {shop_url}
          </a>
        </Box>
        <Button disabled={enable} variant="contained" sx={{ width: { md: '50%', xs: '100%' }, bgcolor: '#5D449B' }}
         onClick={()=>{navigate(`/${shop_name}/dashboard`);window.location.reload()}}
         >
          Go to Dashboard
        </Button>
      </Box>
      <Lottie
        options={defaultOptions}
        height={'60vh'} // Adjust the height as needed
        width={'50%'} // Adjust the width as needed
      />
      <Box sx={{ my: '48px', width: '50%', mx: 'auto' }}>
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} sx={{ p: 2, borderRadius: '8px', color: '#3C83C4' }} />
      </Box>
    </Box>
  );
};

export default FakePege;
