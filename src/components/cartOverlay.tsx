import React from "react";
import CartProduct from "./cartProduct";
import { connect } from "react-redux";
import { RootState } from "../store";
import { CartItem, OrderItem, PlaceOrderResponse } from "../types";
import {
  addToCart,
  emptyCart,
  removeFromCart,
  toggleCartOverlay,
} from "../reducers/cartSlice";
import { graphql } from "@apollo/client/react/hoc";
import { PLACE_ORDER } from "../graphql/mutations";
import { MutationFunction } from "@apollo/client";
import toast from "react-hot-toast";

interface ReduxCartProps {
  cartItems: CartItem[];
  removeFromCart: typeof removeFromCart;
  addToCart: typeof addToCart;
  emptyCart: typeof emptyCart;
  toggleCartOverlay: typeof toggleCartOverlay;
}

interface GraphqlProps {
  placeOrder: MutationFunction<
    { placeOrder: PlaceOrderResponse },
    { items: OrderItem[] }
  >;
}

type CombinedProps = ReduxCartProps & GraphqlProps;

class CartOverlay extends React.Component<CombinedProps> {
  handlePlaceOrder = () => {
    const { cartItems, placeOrder, emptyCart, toggleCartOverlay } = this.props;

    const items = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.amount,
      price: item.price,
      selected_attribute_item_ids: item.selectedAttributes.map(
        (attr) => attr.selectedItemId
      ),
    }));

    const toastId = toast.loading("Placing order...");

    placeOrder({ variables: { items } })
      .then((response) => {
        console.log("Order placed successfully", response.data);
        emptyCart();
        toggleCartOverlay();
        showOrderToast(response.data?.placeOrder);
      })
      .catch((error: any) => {
        console.error("Error placing order", error);
        toast.error("Failed to place the order. Please try again.");
      })
      .finally(() => {
        toast.dismiss(toastId);
      });
  };

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
      <div
        data-testid="cart-overlay"
        className="absolute w-full md:w-1/2 lg:w-1/4 top-full right-0 px-4 py-8 flex flex-col gap-8 z-30 bg-white rounded-md"
      >
        <div className="flex flex-col gap-8">
          <p className="font-bold">
            My Bag,{" "}
            <span className="font-medium">
              {cartInfo.totalCount === 1
                ? `1 Item`
                : `${cartInfo.totalCount} Items`}
            </span>
          </p>

          <div className="flex flex-col gap-10 max-h-[400px] overflow-y-auto p-2">
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
            className="p-3 text-base font-semibold text-white bg-[#5ECE7B] disabled:bg-slate-400 rounded-lg"
            disabled={cartInfo.totalCount === 0}
            onClick={this.handlePlaceOrder}
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
  emptyCart,
  toggleCartOverlay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql<{}, CombinedProps, {}, CombinedProps>(PLACE_ORDER, {
    name: "placeOrder",
  })(CartOverlay)
);

function showOrderToast(response?: PlaceOrderResponse) {
  if (!response) return;
  toast.custom(
    (t) => (
      <div
        className={`max-w-md  w-full p-4 bg-white rounded-lg shadow-lg border border-gray-200 `}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-green-600">
            🎉 Order #{response.id} Placed Successfully!
          </h2>
          <p className="text-gray-700">
            Your order total is{" "}
            <span className="font-semibold">${response.total.toFixed(2)}</span>.
          </p>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {response.items.map((item, i) => (
              <div key={i} className="border-b border-gray-300 pb-2 mb-2">
                <h3 className="text-sm font-bold text-gray-900">
                  {item.product_id}
                </h3>
                <p className="text-sm text-gray-700">
                  Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                </p>
                <ul className="text-sm text-gray-600">
                  {item.selected_attributes.map((attr) => (
                    <li key={attr.name}>
                      <span className="font-medium">{attr.name}:</span>{" "}
                      {attr.display_value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      </div>
    ),
    { duration: 10000 }
  );
}
