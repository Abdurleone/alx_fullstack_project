import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import { DarkModeContextProvider } from "./context/darkModeContext.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);