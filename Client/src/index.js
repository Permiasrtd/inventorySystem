import React from "react";

import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

import ThemeContext from "./theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <ThemeContext>
    <ToastContainer />
    <App />
  </ThemeContext>,

  document.getElementById("root")
);

serviceWorker.unregister();
