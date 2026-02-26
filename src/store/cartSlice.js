import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveUserCart, clearUserCart, loadItems } from "../utils/cartStorage";
const baseUrl = import.meta.env.VITE_BASE_URL; 

export const fetchUserCarts = createAsyncThunk(
  "carts/fetchUserCarts",
  async (id, { rejectWithValue }) => {
    //  console.log("Thunk received :", id);
    try {
      const res = await fetch(`https://dummyjson.com/carts/user/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch carts");
      }

      const data = await res.json();
      //  console.log("DummyJSON carts response:", data);
      return data.carts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addToCartAPI = createAsyncThunk(
  "carts/addToCartAPI",
  async ({  userId, product }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          products: [{ id: product.id, quantity: 1 }],
        }),
      });
      if (!res.ok) {
        throw new Error("Add to cart Failed.");
      }
      await res.json();
      return product;
    } catch (errr) {
      return rejectWithValue(errr.message);
    }
  },
);

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    items: [], //user irl cart
    userId: null,
    carts: [], // this is user cart history
    loading: false,
    error: null,
  },
  reducers: {
    setUsercart(state, action) {
      state.userId = action.payload;
      state.items = loadItems(action.payload);
    },

    clearCart(state) {
      clearUserCart(state.userId);
      state.items = [];
      state.userId = null;
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
        item.total = quantity * item.price;
        saveUserCart(state.userId, state.items);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveUserCart(state.userId, state.items);
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(fetchUserCarts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

      .addCase(fetchUserCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.carts = action.payload;
        // console.log("API: ", action.payload);
      })

      .addCase(addToCartAPI.fulfilled, (state, action) => {
        const existing = state.items.find((i) => i.id === action.payload.id);

        if (existing) {
          existing.quantity += 1;
          existing.total = existing.quantity * existing.price;
        } else {
          state.items.push({
            ...action.payload,
            quantity: 1,
            total: action.payload.price,
          });
        }
        saveUserCart(state.userId, state.items);
      });
  },
});

export const { clearCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;




















































// export const updateCartAPI = createAsyncThunk(
//   "carts/updateCartAPI",
//   async ({ cartId, products }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           merge: true,
//           products,
//         }),
//       });
//       if (!res.ok) {
//         throw new Error("Failed to Update Cart.");
//       }
//       return await res.json();
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// export const deleteCartAPI = createAsyncThunk(
//   "carts/deleteCartAPI",
//   async (cartId, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to Delete");
//       }
//       return cartId;
//     } catch (errr) {
//       return rejectWithValue(errr.message);
//     }
//   },
// );
// .addCase(updateCartAPI.fulfilled, (state, action) => {
//   const index = state.carts.findIndex((c) => c.id === action.payload.id);
//   if (index !== -1) {
//     state.carts[index] = action.payload;
//   }
// })

// .addCase(deleteCartAPI.fulfilled, (state, action) => {
//   state.carts = state.carts.filter((c) => c.id !== action.payload);
// });
