import { createTheme } from '@mui/system';
import inter from '../../assets/fonts/Inter-Bold.ttf';


export const interFont = createTheme({
  
  typography: {
    fontFamily:  'Inter', 'Cairo' ,

  },
  components: {
    MuiCssBaseline: {
      styleOverrides: ` 
        @font-face {
          font-family: 'Inter, Cairo' ;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('inter'), local('inter-Regular'), url(${inter}) format('ttf');
        }
       
      `,

    },
  },
});