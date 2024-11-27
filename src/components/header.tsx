import React from "react";
import Navigation from "./navigation";
import logo from "../../src/assets/logo.svg";
import cartIcon from "../../src/assets/cart-icon.svg";
import CartOverlay from "./cartOverlay";
import navigationIcon from "../assets/icons8-navigation-menu.svg";

interface State {
  showCartOverlay: boolean;
  totalItems: number;
  showMobileNav: boolean;
}

class Header extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showCartOverlay: false,
      totalItems: 3,
      showMobileNav: false,
    };
  }

  render(): React.ReactNode {
    const { showCartOverlay, totalItems, showMobileNav } = this.state;

    return (
      <header className="flex items-center justify-between py-3 lg:py-6 relative">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <Navigation />
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden"
          onClick={() =>
            this.setState((prev) => ({ showMobileNav: !prev.showMobileNav }))
          }
        >
          <img src={navigationIcon} alt="menu" />
        </button>

        {/* Logo */}
        <div className="absolute  left-1/2">
          <img src={logo} alt="logo" className="h-8 lg:h-10 mx-auto lg:mx-0" />
        </div>

        {/* Cart Icon */}
        <button
          onClick={() =>
            this.setState((prev) => ({
              showCartOverlay: !prev.showCartOverlay,
            }))
          }
          className="relative"
        >
          <img src={cartIcon} alt="cart icon" className="h-6 lg:h-8" />
          {totalItems > 0 && (
            <div className="absolute bottom-1/3 left-[80%] w-5 h-5 md:w-8 md:h-8 bg-[#1D1F22] rounded-full flex items-center justify-center text-base md:text-lg text-white font-bold">
              {totalItems}
            </div>
          )}
        </button>

        {/* Cart Overlay */}
        {showCartOverlay && <CartOverlay />}
        {showCartOverlay && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => this.setState({ showCartOverlay: false })}
          ></div>
        )}

        {/* Mobile Navigation */}
        {showMobileNav && (
          <div className="fixed inset-0 bg-white z-30 p-4 lg:hidden">
            <Navigation
              closeMobileNav={() => {
                this.setState({ showMobileNav: false });
              }}
            />
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => this.setState({ showMobileNav: false })}
            >
              ✕
            </button>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
