import { ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#eeeeee",
    },
    primary: {
      main: "#091A2B",
    },
    secondary: {
      main: "#31FD00",
    },
    background: {
      default: "#273a4c",
      paper: "#172a3f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          "&.Mui-disabled": {
            color: "#7f7f7f",
          }
        },
      },
    },
  },
};

export default themeOptions;
