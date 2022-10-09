import React from "react";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { Main } from "./pages/Main/Main";
import { MenuComponents } from "./components/Menu";

function App() {
  return (
    <div className="App">
      <div className="components">
        <MenuComponents />
        <Main />
      </div>
    </div>
  );
}

export default App;
