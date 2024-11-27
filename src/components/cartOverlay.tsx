import React from "react";
import CartProduct from "./cartProduct";

class CartOverlay extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="absolute w-full md:w-1/2 lg:w-1/4 top-full right-0 px-4 py-8 flex flex-col gap-8 z-30 bg-white">
        <div className="flex flex-col gap-8">
          <p className="font-bold">
            My Bag, <span className="font-medium">3 items</span>
          </p>

          <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto p-2">
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </div>

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>$200.00</p>
          </div>

          <button className="p-3 text-base font-semibold text-white bg-[#5ECE7B]">
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
