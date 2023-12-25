/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import React from 'react'
import deletebrand from '../../assets/images/deletebrand.svg'
const BrandBox = ({website,name,logo}) => {
  return (
    <Box sx={{width: '100%',
    height: '187px',borderRadius: '8px',
    border: '1px solid  #D3D3D3'
    }}>
        <Box sx={{display:'flex',justifyContent:'flex-end',padding:'8px 14.6px'}}>
            <img src={deletebrand} alt=''/>
        </Box>
        <Box sx={{width: '102px',
height: '64px',
m:'auto'}}>
            <img src={logo} alt={name} style={{height:'100%',width:'100%'}}/>
        </Box>
        <Box sx={{mt:'12px'}}>
            <Typography sx={{color: '#7F7F7F',
textAlign: 'center',
fontFamily: 'Inter',
fontSize: '12px',
fontWeight: 500,
lineHeight: '20.8px'}}>{website}</Typography>
<Typography sx={{color: ' #343434',
fontFamily: 'Inter',
fontSize: '18px',
fontWeight: 600,
textAlign: 'center',
lineHeight: '20.8px',}}>{name}</Typography>
        </Box>
    </Box>
  )
}

export default BrandBox