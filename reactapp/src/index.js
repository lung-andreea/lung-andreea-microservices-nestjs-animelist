import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainContextProvider } from "./contexts/MainContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <Router>
        <App />
      </Router>
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
