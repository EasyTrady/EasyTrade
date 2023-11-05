import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const ProductInput = styled(TextField)({
  border: 'none',
  width: '100%',
  '.MuiInputBase-input': {
    background: 'transparent'
  }
});
export const ButtonSave = styled(Button)({
  border: 'none',
  width: '100%',
  height: '50px',
  // color:'#fff',
  bgcolor: '#5D449B'
});
export const ButtonImage = styled(Button)({
  border: 'none',
  width: '100%',
  height: '60px',
  // color:'#fff',
  backgroundColor: "gray"
});
export const MainButton = styled(Button)({
  border: 'none',
  background: '#5D449B',

 color:'#fff',
  width: '217px',
height: '48px',
padding: '7px 16px 7px 16px',
borderRadius: '12px',
fontSize:'14px',
  fontWeight:400,
gap: '8px',
':hover':{
  background: '#5D449B',
}

});
export const PrintButton = styled(Button)({
  width: '113px',
  height: '48px',
  // padding: '4px 12px 4px 16px',
  borderRadius: '12px',
  border: '1px',
  gap: '6px',
  fontSize:'14px',
  fontWeight:400,
  background:
         'linear-gradient(0deg, #FFFFFF, #FFFFFF)',
         color:'#121212',
         fontSize:'14px',
':hover':{
  background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF)',
  color:'#121212',
}

});
