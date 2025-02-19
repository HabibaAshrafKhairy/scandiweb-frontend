import React from "react";
import ProductTextAttribute from "../pages/PDP/productTextAttribute";
import ProductColor from "../pages/PDP/productColor";
import { CartItem } from "../types";
import { removeFromCart, addToCart } from "../reducers/cartSlice";

interface CartProps {
  cartItem: CartItem;
  removeFromCart: typeof removeFromCart;
  addToCart: typeof addToCart;
}

class CartProduct extends React.Component<CartProps> {
  render(): React.ReactNode {
    const { removeFromCart, addToCart, cartItem } = this.props;

    return (
      <div className="grid grid-cols-[70%,_30%] gap-2">
        <div className="flex">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-light">{cartItem.name}</p>
            <p className="font-semibold text-base">
              ${cartItem.price.toFixed(2)}
            </p>
            {cartItem?.attributes?.map((attribute) => {
              if (attribute?.type === "swatch")
                return (
                  <ProductColor
                    key={attribute?.id}
                    colors={attribute?.items}
                    size="sm"
                    isCartItem={true}
                    cartItemSelectedColor={
                      cartItem.selectedAttributes.find(
                        (selectedAttr) =>
                          selectedAttr.attributeSetName === "Color"
                      )?.selectedItemName
                    }
                  />
                );
              else
                return (
                  <ProductTextAttribute
                    key={attribute?.id}
                    attribute={attribute}
                    size="sm"
                    isCartItem={true}
                    cartItemSelectedAttributeId={
                      cartItem.selectedAttributes.find(
                        (selectedAttr) =>
                          selectedAttr.attributeSetName === attribute.name
                      )?.selectedItemId
                    }
                  />
                );
            })}
          </div>

          <div className="ml-auto flex flex-col justify-between text-base font-normal">
            <button
              className="w-6 h-6 items-center justify-center border border-[#1D1F22] rounded-sm"
              onClick={() => {
                addToCart(cartItem);
              }}
              data-testid="cart-item-amount-increase"
            >
              +
            </button>
            <p className="text-center" data-testid="cart-item-amount">
              {cartItem.amount}
            </p>
            <button
              className="w-6 h-6 items-center justify-center border border-[#1D1F22] rounded-sm"
              onClick={() => {
                removeFromCart({
                  id: cartItem.id,
                  selectedAttributes: cartItem.selectedAttributes,
                });
              }}
              data-testid="cart-item-amount-decrease"
            >
              -
            </button>
          </div>
        </div>

        <div className="w-full h-full bg-[#cccccc28] flex justify-center object-contain rounded-md">
          <img
            src={cartItem.gallery && cartItem.gallery[0]}
            alt="product image"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    );
  }
}

export default CartProduct;
