import { createSlice } from "@reduxjs/toolkit";
import {
  clearWishlist,
  loadWishlist,
  saveWishlist,
} from "../utils/wishlistStorage";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    userId: null,
  },
  reducers: {
    setUserWishlist(state, action) {
      state.userId = action.payload;
      state.items = loadWishlist(action.payload) || [];
    },

    addtoWishlist(state, action) {
      const product = action.payload;
      const exits = state.items.find((i) => i.id === product.id);

      if (exits) {
        return;
      } else {
        state.items.push(product);
      }

      saveWishlist(state.userId, state.items);
    },

    removefromWishlist(state, action) {
      const product = action.payload;
      const exits = state.items.find((i) => i.id === product.id);

      if (exits) {
        state.items = state.items.filter((p) => p.id !== product.id);
      } else {
        return;
      }

      saveWishlist(state.userId, state.items);
    },

    toggleWishlist(state, action) {
      const product = action.payload;
      const exits = state.items.find((i) => i.id === product.id);

      if (exits) {
        state.items = state.items.filter((p) => p.id !== product.id);
      } else {
        state.items.push(product);
      }

      saveWishlist(state.userId, state.items);
    },

    clearWishlistLogout(state, action) {
      const userId = action.payload;
      clearWishlist(userId);
      state.items = [];
      state.userId = null;
    },
  },
});

export const { setUserWishlist, addtoWishlist, removefromWishlist, toggleWishlist, clearWishlistLogout } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
