import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "../api/adminApi";
import { loadOrders, saveOrders } from "../utils/orderStorage";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart();
      return data.carts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    userOrders: [],
    selectOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectedOrder(state, action) {
      state.selectOrder = action.payload;
    },

    loadUserOrders(state, action) {
      const orders = loadOrders(action.payload);
      state.userOrders = Array.isArray(orders) ? orders : [];
    },

    addUserOrder(state, action) {
      if (!Array.isArray(state.userOrders)) {
        state.userOrders = [];
      }

      state.userOrders.unshift(action.payload);
      saveOrders(action.payload.userId, state.userOrders);
    },

    clearUserOrders(state) {
      state.userOrders = [];
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(fetchOrders.pending, (state) => {
      ((state.loading = true), (state.error = null));
    })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
        //console.log("Slice: ", action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectedOrder, loadUserOrders, addUserOrder, clearUserOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
