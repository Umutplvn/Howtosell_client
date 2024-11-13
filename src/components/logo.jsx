import React from "react";
import "../style/logo.css";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
 
      <div className="pulse">
        <span style={{ "--i": 0 }}></span>
        <span style={{ "--i": 1 }}></span> 
        <img src={logo} className="logo" />
      </div>
  );
};

export default Logo;
