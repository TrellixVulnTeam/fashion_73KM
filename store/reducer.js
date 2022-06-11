import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  loginUser: [],
  totalProducts: [],
  casualProduct: [],
  sareeProduct: [],
  productId: [],
  carts: [],
};

const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    drawer: (state, action) => {
      state.visible = action.payload;
    },
    loginAccount: (state, action) => {
      state.loginUser = action.payload;
    },
    Allproducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    Casualproducts: (state, action) => {
      state.casualProduct = action.payload;
    },
    SareeProducts: (state, action) => {
      state.sareeProduct = action.payload;
    },
    ProductById: (state, action) => {
      state.productId = action.payload;
    },
    AllCart: (state, action) => {
      state.carts = action.payload;
    },
    Increment: (state, action) => {
      const data = action.payload.carts;
      const id = action.payload.id;
      const updatedata = data.map((values) => {
        if (id == values.id) {
          return { ...values, quantity: values.quantity + 1 };
        }
        return values;
      });
      state.carts = updatedata;
    },
    Decrement: (state, action) => {
      const data = action.payload.carts;
      const id = action.payload.id;
      const updatedata = data.map((values) => {
        if (id == values.id) {
          if (values.quantity == 1) {
            return { ...values };
          } else {
            return { ...values, quantity: values.quantity - 1 };
          }
        }
        return values;
      });
      state.carts = updatedata;
    },
  },
});
export const {
  drawer,
  loginAccount,
  Allproducts,
  Casualproducts,
  SareeProducts,
  ProductById,
  AllCart,
  Increment,
  Decrement,
} = global.actions;
export default global.reducer;
