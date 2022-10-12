import React from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { MenuComponents } from "./components/Menu";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="components">
          <MenuComponents />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
