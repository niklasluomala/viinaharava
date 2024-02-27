import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h1: {
      fontSize: '3.2rem',
      lineHeight: 2,
    },
    h2: {
      fontSize: '2.6rem',
      lineHeight: 2,
    },
    h3: {
      fontSize: '2rem',
      lineHeight: 2,
    },
    h6: {
      fontSize: '1rem',
      lineHeight: 2,
    },
  },
});
export default theme;
