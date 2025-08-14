import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    allproduct: [],
    searchedProduct: "",
    SelectedPrice: null
  },
  reducers: {
    StoreProduct: (state, action) => {
      if (action.payload) {
        state.allproduct = [...action.payload] || [];
      }
    },
    SearchProduct: (state, action) => {
      if (action.payload || action.payload === '') {
        state.searchedProduct = action.payload;
      }
    },
    sortSelected: (state, action) => {
      let type = action.payload.type;
      state.SelectedPrice = (state.SelectedPrice === type) ? null : type
    }
  },
});

export const { StoreProduct, SearchProduct, sortSelected } = ProductSlice.actions;
export default ProductSlice.reducer;
