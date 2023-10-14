import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { FileItem } from "src/components/FileUpload";
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
  name: "toggler",
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
  },
});

export const itemsSelector = (state: RootState) => state.cart.items;
export const selectedItemsSelector = (state: RootState) => state.cart.selected;

export const { addToCart, increment, decrement, selectItem } =
  cartReducer.actions;
export default cartReducer.reducer;
