import React from "react";
import Navigation from "./navigation";
import logo from "../../src/assets/logo.svg";

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="flex justify-between h-20 pt-6">
        <Navigation />
        <div>
          <img src={logo} alt="logo" />
        </div>
        <p>cart overlay</p>
      </div>
    );
  }
}

export default Header;
