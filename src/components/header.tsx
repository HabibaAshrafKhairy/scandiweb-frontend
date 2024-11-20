import React from "react";
import Navigation from "./navigation";
import logo from "../../src/assets/logo.svg";
import cartIcon from "../../src/assets/cart-icon.svg";
import CartOverlay from "./cartOverlay";

interface State {
  showCartOverlay: boolean;
}

class Header extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { showCartOverlay: false };
  }

  render(): React.ReactNode {
    console.log(this.state.showCartOverlay);
    return (
      <div className="flex justify-between h-20 pt-6 relative">
        <Navigation />
        <div>
          <img src={logo} alt="logo" />
        </div>
        <button
          onClick={() => {
            this.setState((prev) => {
              return { showCartOverlay: !prev.showCartOverlay };
            });
          }}
        >
          <img src={cartIcon} alt="cart icon" />
        </button>

        {this.state.showCartOverlay && <CartOverlay />}
        {/* Grey Overlay */}
        {this.state.showCartOverlay && (
          <div
            className="fixed inset-0 top-20 bg-black bg-opacity-50 z-20"
            onClick={() => this.setState({ showCartOverlay: false })}
          ></div>
        )}
      </div>
    );
  }
}

export default Header;
