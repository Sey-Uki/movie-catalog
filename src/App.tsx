import React from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="components">
          <Navigation />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
