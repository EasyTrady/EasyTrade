import styled from '@emotion/styled';
import { Box, Button, Select, TextField, Typography } from '@mui/material';

export const ButtonSubScribtion = styled(Button)({
  borderRadius: '38px',
  p: '10px',
  height: '40px',
  textAlign: 'center',
  color: '#000000',
  fontSize: '16px',
  border: '1px solid #5D449B',
  letterSpacing: '-1.5%',
  ml: '2.5%',
  textTransform: 'none',
  mt: '20px',
  width: '95%'
});
export const TitleText = styled(Typography)({
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '33px',
  color: '#272C2E',
  marginTop: '24px',
  marginBottom: '20px'
});
export const ValidateBox = styled(Box)({
  border: 'none',
  width: { xl: '70%', lg: '70%', md: '70%', sm: '80%', xs: '80%' },
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '24px'
});

export const InputField = styled(TextField)({
  width: '100%',
  input: {
    backgroundColor: 'transparent',
    color: '#7F7F7F',
    paddingLeft: '16px',
    '&:-webkit-autofill': {
      '-webkit-text-fill-color': '#7F7F7F !important',
      '-webkit-background-clip': ' text !important',
      'background-clip': 'text !important'
    }
  },
  '& label.Mui-focused': {
    background: 'transparent'
  },
  '& .MuiInput-underline:after': {
    // borderBottomColor: "#6E2E02",
  },
  '& .MuiOutlinedInput-root': {
    border: '1px solid #DADADA',
    height: '50px',
    borderRadius: '10px',

    '& .fieldset': {
      borderColor: 'transparent',
      background: 'transparent'
    },
    '&:hover fieldset': {
      border: '1px solid #DADADA'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #DADADA',
      background: 'transparent'
    }
  }
});
export const ButtonLogin = styled(Button)({
  width: '30%',
  padding: '10px',
  backgroundColor: '#D351B0',
  borderRadius: '38px',
  fontSize: '16px',
  textAlign: 'center',
  fontWeight: 600,
  marginLeft: '30px',
  lineHeight: '29.98px',
  color: '#FFFFFF',
  display: 'flex',
  ':hover': { backgroundColor: '#D351B0' },
  textTransform: 'none'
});
export const TextValidat = styled(Typography)({
  marginTop: '1px',
  fontSize: '14px',
  color: 'red',
  marginLeft: '30px',
  display: 'flex'
});

export const DropDownSelect = styled(Select)({
  height: '50px',
  color: '#5D5FEF',
  width: '100%',
  borderRadius: '10px',
  padding: '0px 24px 0px 24px',
  marginBottom: '24px',
  border: '1px solid #DADADA',
  '&:hover': {
    '&& fieldset': {
      border: '1px solid #DADADA'
    }
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #DADADA'
  }
});
