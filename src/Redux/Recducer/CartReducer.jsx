import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    ShippedCart: [],
    total: 0,
    discount: 0,
    platformCharges: 20,
    deliveryCharges: 50,
    grandTotal: 0,
  },
  reducers: {
    AddToCart: (state, action) => {
      const cartdata = state.cart.find((i) => i.id === action.payload.id);
      console.log(action.payload)
      if (!cartdata) {
        state.cart.push({ ...action.payload });
      }
    },
    RemoveFromCart: (state, action) => {
      const filteredDate = state.cart.filter((i) => i.id !== action.payload.id);
      if (filteredDate) {
        state.cart = filteredDate;
      }
    },
    ChangeQuantity: (state, action) => {
      if (action.payload) {
        const countData = state.cart.find(
          (count) => count.id === action.payload.content.id
        );
        if (countData && action.payload.type === "INC") {
          countData.quantity += 1;
        } else if (countData.quantity > 1) {
          countData.quantity -= 1;
        }
      }
    },
    setTotal: (state, action) => {
      if (action.payload) {
        state.total = action.payload.total || 0;
        state.discount = action.payload.discount || 0;
        state.grandTotal =
          state.total +
          state.platformCharges +
          state.deliveryCharges -
          state.discount;
      }
      if (state.grandTotal < 0) {
        state.grandTotal = 0;
      }
    },
    removeCart: (state, action) => {
      state.ShippedCart = [...action.payload];
      state.cart = []
    }
  },
});

export const { AddToCart, RemoveFromCart, ChangeQuantity, setTotal, removeCart } =
  CartSlice.actions;
export default CartSlice.reducer;
