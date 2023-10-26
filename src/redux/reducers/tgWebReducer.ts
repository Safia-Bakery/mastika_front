import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { HandleCount } from "src/utils/types";

interface ValueType {
  value?: string | number;
  name?: string;
}

interface DetailsType extends ValueType {
  price?: number;
  count?: number;
}

interface State {
  items: {
    delivery_type?: ValueType;
    direction?: ValueType;

    complexity?: ValueType;
    floors?: number;
    portion?: number;
    filling_type?: ValueType;
    filling?: { [key: number | string]: ValueType };
    palette?: { [key: number | string]: number | string };
    palette_details?: number | string;
    orderPackage?: DetailsType;
    // additions?: DetailsType[];
    examplePhoto?: string[];
    comments?: string;
    dynamic?: { [key: number | string]: number | string };

    client?: string;
    manager?: string;
    addrerss?: string;

    branch?: ValueType;

    date?: Date;
  };
  cart: { [key: string]: DetailsType };
}

const initialState: State = {
  items: {
    delivery_type: undefined,
    direction: undefined,
    complexity: undefined,
    floors: undefined,
    portion: undefined,
    filling_type: undefined,
    filling: {},
    palette: undefined,
    palette_details: undefined,
    orderPackage: undefined,
    // additions: undefined,
    examplePhoto: undefined,
    comments: undefined,
  },
  cart: {},
};

export const tgReducer = createSlice({
  name: "tg_order",
  initialState,
  reducers: {
    tgAddItem: (state, { payload }: PayloadAction<State["items"]>) => {
      state.items = { ...state.items, ...payload };
    },
    tgAddToCart: (state, { payload }: PayloadAction<DetailsType>) => {
      state.cart[payload?.value!] = payload;
    },

    tgClearCart: (state) => {
      state.cart = {};
    },

    tgClearItems: (state) => {
      state = initialState;
    },

    tgHandleCount: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string | number; operation: HandleCount }>
    ) => {
      if (payload.operation === HandleCount.increment) {
        state.cart[payload.id].count!++;
      } else {
        if (state.cart[payload.id].count! > 1) state.cart[payload.id].count!--;
        else {
          const updated = { ...state.cart };
          delete updated[payload.id];
          state.cart = updated;
        }
      }
    },
  },
});

export const tgItemsSelector = (state: RootState) => state.tgOrder.items;
export const tgCartSelector = (state: RootState) => state.tgOrder.cart;

export const {
  tgAddItem,
  tgHandleCount,
  tgAddToCart,
  tgClearCart,
  tgClearItems,
} = tgReducer.actions;
export default tgReducer.reducer;
