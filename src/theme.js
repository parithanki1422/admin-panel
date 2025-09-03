// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: "100%",
      letterSpacing: "-0.11px",
    },
  },
  palette: {
    primary: {
      main: "#2563EB",
    },
  },
});

export default theme;
