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
