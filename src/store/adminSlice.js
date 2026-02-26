import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, getProducts, getUsers } from "../api/adminApi";
import {
  calculateRevenue,
  groupMonthlyOrders,
  groupMontlyRevenue,
} from "../utils/dashboardCalculation";
const baseUrl = import.meta.env.VITE_BASE_URL; 

export const fetchAdminDashboard = createAsyncThunk(
  "admin/fetchDashboard",
  async () => {
    const productsRes = await getProducts();
    const usersRes = await getUsers();
    const cartsRes = await getCart();

    // const revenue = calculateRevenue(cartsRes.carts);

    return {
      stats: {
        totalRevenue: calculateRevenue(cartsRes.carts), 
        totalOrders: cartsRes.carts.length,
        totalCustomers: usersRes.users.length,
        totalProducts: productsRes.products.length,
      },

      monthlyRevenue: groupMontlyRevenue(cartsRes.carts, 6),
      monthlyOrders: groupMonthlyOrders(cartsRes.carts, 6),
    };
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
    },
    monthlyRevenue: [],
    monthlyOrders: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.monthlyRevenue = action.payload.monthlyRevenue;
        state.monthlyOrders = action.payload.monthlyOrders;
        // console.log("Slice: ", action.payload.monthlyOrders, action.payload.monthlyRevenue);
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;


