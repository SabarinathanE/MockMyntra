import { createSlice } from "@reduxjs/toolkit";

const WishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
    logos: [{}],
  },
  reducers: {
    StoreWishList: (state, action) => {
      const addwishList = state.wishList.find(
        (i) => i.id === action.payload.id
      );
      if (!addwishList) {
        state.wishList.push({ ...action.payload });
      }
    },
    DeleteWithList: (state, action) => {
      const filteredDate = state.wishList.filter(
        (i) => i.id !== action.payload.id
      );
      if (filteredDate) {
        state.wishList = filteredDate;
      }
    },
    InsertLogo: (state, action) => {
      if (action.payload) {
        state.logos = [{ ...action.payload }];
      }
    },
  },
});

export const { StoreWishList, DeleteWithList, InsertLogo } =
  WishListSlice.actions;
export default WishListSlice.reducer;
