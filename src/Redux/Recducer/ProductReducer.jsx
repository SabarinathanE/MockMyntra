import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    allproduct: [],
    searchedProduct: "",
    SelectedPrice: null,
    SelectedCategory: []
  },
  reducers: {
    StoreProduct: (state, action) => {
      if (action.payload) {
        state.allproduct = action.payload.map(product => ({...product, quantity: 1})) || [];
      }
    },
    SearchProduct: (state, action) => {
      if (action.payload || action.payload === '') {
        state.searchedProduct = action.payload;
      }
    },
    sortSelected: (state, action) => {
      let type = action.payload.type;
      state.SelectedPrice = type
    },
    ChangeProductQuantity: (state, action) => {
      if (action.payload) {
        const countData = state.allproduct.find(
          (count) => count.id === action.payload.content.id
        );
        if (countData && action.payload.type === "INC") {
          countData.quantity += 1;
        } else if (countData.quantity > 1) {
          countData.quantity -= 1;
        }
      }
    },
    ChangeCategory: (state, action) => {
      if((state.SelectedCategory).includes(action.payload)) {
        state.SelectedCategory = [...state.SelectedCategory].filter((f) => f !== action.payload)
      } else {
        state.SelectedCategory = [...state.SelectedCategory, action.payload]
      }

      if(action.payload === 'clear') {
        state.SelectedCategory = []
      }
    }
  },
});

export const { StoreProduct, SearchProduct, sortSelected, ChangeProductQuantity, ChangeCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
