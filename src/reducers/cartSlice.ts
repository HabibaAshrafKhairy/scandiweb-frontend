import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, SelectedAttribute } from "../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"), // Load from localStorage if available
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      // Check if an item with the same id and selectedAttributes already exists in the cart
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
      );

      if (existingItemIndex !== -1) {
        // If found, increase the amount of the existing item
        state.items[existingItemIndex].amount += 1;
      } else {
        // Otherwise, treat it as a new item and add it to the cart
        state.items.push({ ...action.payload, amount: 1 });
      }

      // Save cart data to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart(
      state,
      action: PayloadAction<{
        id: string;
        selectedAttributes: SelectedAttribute[];
      }>
    ) {
      // Find the index of the item to be removed
      const itemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        if (item.amount === 1) {
          // Remove the item from the cart
          state.items.splice(itemIndex, 1);
        } else {
          // Decrease the amount
          item.amount -= 1;
        }
      }

      // Save cart data to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
