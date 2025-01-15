import React from "react";
import Navigation from "./navigation";
import logo from "../../src/assets/logo.svg";
import cartIcon from "../../src/assets/cart-icon.svg";
import CartOverlay from "./cartOverlay";
import navigationIcon from "../assets/icons8-navigation-menu.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../store";
import { CartItem } from "../types";
import { toggleCartOverlay } from "../reducers/cartSlice";

interface State {
  showMobileNav: boolean;
}

interface CartProps {
  isCartOverlayOpen: boolean;
  toggleCartOverlay: typeof toggleCartOverlay;
  cartItems: CartItem[];
}

class Header extends React.Component<CartProps, State> {
  constructor(props: CartProps) {
    super(props);
    this.state = {
      showMobileNav: false,
    };
  }

  render(): React.ReactNode {
    const { showMobileNav } = this.state;

    const { isCartOverlayOpen, cartItems, toggleCartOverlay } = this.props;

    const cartInfo = cartItems.reduce(
      (acc, item) => {
        return {
          totalCount: acc.totalCount + item.amount,
          totalPrice: acc.totalPrice + item.amount * item.price,
        };
      },
      { totalCount: 0, totalPrice: 0 }
    );

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
        <Link to="/products/">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={logo} alt="logo" />
          </div>
        </Link>

        {/* Cart Icon */}
        <button
          onClick={() => toggleCartOverlay()}
          className="relative"
          data-testid="cart-btn"
        >
          <img src={cartIcon} alt="cart icon" className="h-4 lg:h-6" />
          {cartInfo.totalCount > 0 && (
            <div className="absolute bottom-1/3 left-[80%] w-4 h-4 md:w-6 md:h-6 bg-[#1D1F22] rounded-full flex items-center justify-center text-xs md:text-sm text-white font-bold">
              {cartInfo.totalCount}
            </div>
          )}
        </button>

        {/* Cart Overlay */}
        {isCartOverlayOpen && <CartOverlay />}
        {isCartOverlayOpen && (
          <div
            className="fixed inset-0 top-20 bg-black bg-opacity-50 z-20"
            onClick={() => toggleCartOverlay()}
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

const mapStateToProps = (state: RootState) => ({
  cartItems: state.cart.items,
  isCartOverlayOpen: state.cart.isCartOverlayOpen,
});

const mapDispatchToProps = {
  toggleCartOverlay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
