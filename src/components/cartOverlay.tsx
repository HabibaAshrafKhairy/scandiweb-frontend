import React from "react";
import CartProduct from "./cartProduct";
import { connect } from "react-redux";
import { RootState } from "../store";
import { CartItem } from "../types";
import { addToCart, removeFromCart } from "../reducers/cartSlice";

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: typeof removeFromCart;
  addToCart: typeof addToCart;
}

class CartOverlay extends React.Component<CartProps> {
  render(): React.ReactNode {
    console.log("cart items", this.props.cartItems);

    const { removeFromCart, addToCart, cartItems } = this.props;

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
      <div className="absolute w-full md:w-1/2 lg:w-1/4 top-full right-0 px-4 py-8 flex flex-col gap-8 z-30 bg-white">
        <div className="flex flex-col gap-8">
          <p className="font-bold">
            My Bag,{" "}
            <span className="font-medium">
              {cartInfo.totalCount === 1
                ? `1 Item`
                : `${cartInfo.totalCount} Items`}
            </span>
          </p>

          <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto p-2">
            {cartItems.length > 0 &&
              cartItems.map((cartItem) => (
                <CartProduct
                  key={Math.random()}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  cartItem={cartItem}
                />
              ))}
          </div>

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p data-testid="cart-total">${cartInfo.totalPrice.toFixed(2)}</p>
          </div>

          <button
            className="p-3 text-base font-semibold text-white bg-[#5ECE7B] disabled:bg-slate-400"
            disabled={cartInfo.totalCount === 0}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cartItems: state.cart.items,
});

const mapDispatchToProps = {
  removeFromCart,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
