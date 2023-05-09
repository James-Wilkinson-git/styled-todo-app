import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  // You can continue writing global styles here
  body {
    padding: 0;
    background-color: #333;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Normalize />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
