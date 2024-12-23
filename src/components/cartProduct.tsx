import React from "react";
import image from "../../src/assets/Image.png";
import ProductTextAttribute from "../pages/PDP/productTextAttribute";
import ProductColor from "../pages/PDP/productColor";

interface State {
  itemCount: number;
}

class CartProduct extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { itemCount: 1 };
  }

  render(): React.ReactNode {
    return (
      <div
        className="grid grid-cols-[1fr,_auto,_1fr] gap-2"
        data-testid="cart-item-attribute-${attribute name in kebab case}"
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-light">Running Shorts</p>
          <p className="font-normal text-base">$50.00</p>
          <ProductTextAttribute size="sm" />
          <ProductColor size="sm" />
        </div>

        <div className="flex flex-col justify-between text-base font-normal">
          <button
            className="w-6 h-6 items-center justify-center border border-[#1D1F22]"
            onClick={() => {
              this.setState((prev) => ({ itemCount: prev.itemCount + 1 }));
            }}
            data-testid="cart-item-amount-increase"
          >
            +
          </button>
          <p className="text-center" data-testid="cart-item-amount">
            {this.state.itemCount}
          </p>
          <button
            className="w-6 h-6 items-center justify-center border border-[#1D1F22]"
            onClick={() => {
              if (this.state.itemCount === 1) return;
              this.setState((prev) => ({ itemCount: prev.itemCount - 1 }));
            }}
            data-testid="cart-item-amount-decrease"
          >
            -
          </button>
        </div>

        <div className="w-full h-full bg-[#fcfbfc] flex justify-center object-contain">
          <img
            src={image}
            alt="product image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }
}

export default CartProduct;
