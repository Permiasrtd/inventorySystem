import React from "react";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import "boxicons";

const theme = {
  colors: {
    layout: "36,37,38",
    background: "24,25,28",
    element: "58, 59, 60",
    primary: "26,92,255",
    success: "23,201,100",
    danger: "255,71,87",
    warning: "255,186,0",
  },
};

const GlobalStyle = createGlobalStyle`

*{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
}

html body{
    font-family: 'Poppins', sans-serif;
    background-color:rgb(${theme.colors.background});
    color:#ffffff;
    display:flex;
    width:100%;
    align-content:center;
    justify-content:center;
    min-height:100vh;
     overflow:visible;
     p{
      font-family: 'Poppins', sans-serif;
 }
}

.Toastify__toast {
  border-radius:15px;
  background-color:rgb(${theme.colors.element});
  font-family: 'Poppins', sans-serif;
}
.Toastify__toast--rtl {
}
.Toastify__toast--dark {
    background-color:rgb(${theme.colors.background});
}
.Toastify__toast--default {
  background-color: rgb(${theme.colors.element});
}
.Toastify__toast--info {
  background-color:rgb(${theme.colors.primary});
}
.Toastify__toast--success {
    background-color:rgb(${theme.colors.success});
}
.Toastify__toast--warning {
    background-color:rgb(${theme.colors.warning});
}
.Toastify__toast--error {
    background-color:rgb(${theme.colors.danger});
}

`;

export const ColorPicker = (color) => {
  const index = Object.keys(theme.colors).find((value) => value === color);
  return theme.colors[index];
};

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}
