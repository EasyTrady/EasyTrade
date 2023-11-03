import { Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react'
import PropTypes from "prop-types";
function MenuCustom({anchor,children}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
    useEffect(()=>{
        setAnchorEl(anchor)
    },[anchor])
  return (
   <>
   <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{".MuiPopover-paper":{backgroundColor:"white !important"}}}
      >
       {children}
      </Menu>
   </>
  )
}

export default MenuCustom
MenuCustom.propTypes={
    anchor:PropTypes.node,
    children:PropTypes.any
}