import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { CartItems, ProductType } from "src/utils/types";

interface State {
  items: CartItems[];
  selected: { [key: string]: CartItems };
}

const initialState: State = {
  items: [],
  selected: {},
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<ProductType[]>) => {
      state.items = payload.map((item) => ({
        ...item,
        count: 1,
      }));
    },

    increment: (state, { payload }: PayloadAction<number>) => {
      state.items[payload].count++;
    },

    decrement: (state, { payload }: PayloadAction<number>) => {
      if (state.items[payload].count > 1) state.items[payload].count--;
    },

    selectItem: (state, { payload }: PayloadAction<CartItems>) => {
      if (!state.selected?.[payload.id]) state.selected[payload.id] = payload;
      else state.selected[payload.id].count += payload.count;
    },

    incrementSelected: (state, { payload }: PayloadAction<string>) => {
      state.selected[payload].count++;
    },
    decrementSelected: (state, { payload }: PayloadAction<string>) => {
      if (state.selected[payload].count > 1) {
        state.selected[payload].count--;
      } else {
        const updated = { ...state.selected };
        delete updated[payload]; // Remove the item with the given payload

        state.selected = updated;
      }
    },
    clearCart: (state) => {
      state.selected = {};
    },
  },
});

export const itemsSelector = (state: RootState) => state.cart.items;
export const selectedItemsSelector = (state: RootState) => state.cart.selected;

export const {
  addToCart,
  increment,
  decrement,
  selectItem,
  incrementSelected,
  decrementSelected,
  clearCart,
} = cartReducer.actions;
export default cartReducer.reducer;
