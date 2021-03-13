import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
