/* eslint-disable react/prop-types */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import brand from '../../assets/images/Frame 41363.png'
const BrandModel = ({open,handleClose}) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add new Brands"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{display:'flex',flexDirection:'row',gap:'24px',alignItems:'center'}}>
            <img src={brand} alt='brand' />
            <Button>Brand Logo</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default BrandModel