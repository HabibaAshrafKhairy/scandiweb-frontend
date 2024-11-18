import React from "react";
import Navigation from "./navigation";

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="flex justify-between  h-20 pt-6">
        <Navigation />
        <p>cart</p>
        <p>cart overlay</p>
      </div>
    );
  }
}

export default Header;
