import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import StoreProvider from "./state/Stores";
import theme from "./theme";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
