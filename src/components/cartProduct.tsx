import React from "react";
import ProductTextAttribute from "../pages/PDP/productTextAttribute";
import ProductColor from "../pages/PDP/productColor";
import { CartItem } from "../types";
import { removeFromCart } from "../reducers/cartSlice";

interface CartProps {
  cartItem: CartItem;
  removeFromCart: typeof removeFromCart;
}

class CartProduct extends React.Component<CartProps> {
  render(): React.ReactNode {
    const { removeFromCart, cartItem } = this.props;

    return (
      <div
        className="grid grid-cols-[1fr,_auto,_1fr] gap-2"
        data-testid="cart-item-attribute-${attribute name in kebab case}"
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-light">{cartItem.name}</p>
          <p className="font-normal text-base">${cartItem.price.toFixed(2)}</p>
          <ProductTextAttribute size="sm" />
          <ProductColor size="sm" />
        </div>

        <div className="flex flex-col justify-between text-base font-normal">
          <button
            className="w-6 h-6 items-center justify-center border border-[#1D1F22]"
            onClick={() => {
              console.log("add");
            }}
            data-testid="cart-item-amount-increase"
          >
            +
          </button>
          <p className="text-center" data-testid="cart-item-amount">
            {cartItem.amount}
          </p>
          <button
            className="w-6 h-6 items-center justify-center border border-[#1D1F22]"
            onClick={() => {
              removeFromCart(cartItem.id);
            }}
            data-testid="cart-item-amount-decrease"
          >
            -
          </button>
        </div>

        <div className="w-full h-full bg-[#fcfbfc] flex justify-center object-contain">
          <img
            src={cartItem.gallery && cartItem.gallery[0]}
            alt="product image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }
}

export default CartProduct;
