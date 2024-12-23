import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const addedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!addedItem) {
        state.items.push(action.payload);
      } else {
        addedItem.amount++;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (removedItem?.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        removedItem?.amount && removedItem.amount--;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
