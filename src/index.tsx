import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/teko";
import "@fontsource/roboto-condensed";
import App from "./App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "react-image-lightbox/style.css";
import "reactjs-popup/dist/index.css";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
