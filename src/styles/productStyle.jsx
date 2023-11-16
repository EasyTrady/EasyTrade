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
export const BpIcon = styled("span")(({theme}) => ({
	borderRadius: "50%",
	width: 16,
	height: 16,
	boxShadow:
		"inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
	backgroundColor: "#f5f8fa",
	backgroundImage:
		"linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
	".Mui-focusVisible &": {
		outline: "2px auto rgba(19,124,189,.6)",
		outlineOffset: 2,
	},
	"input:hover ~ &": {
		backgroundColor: "#ebf1f5",
	},
	"input:disabled ~ &": {
		boxShadow: "none",
		background: "rgba(206,217,224,.5)",
	},
}));

export const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: "#5D449B",
	backgroundImage: "#5D449B",
	"&:before": {
		display: "block",
		width: 16,
		height: 16,
		backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
		content: '""',
	},
	"input:hover ~ &": {
		backgroundColor: "#5D449B",
	},
});