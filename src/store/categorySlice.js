import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/categories`);
      if (!res.ok) {
        throw new Error("failed to fetch categories");
      }
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "categories/fetchProductsByCategory",
  async ( {categoryName, sortBy, order}, { rejectWithValue }) => {
    //console.log(categoryName);
    try {
      let url = `${baseUrl}/products/category/${categoryName}`;

      if (sortBy && order) {
        url += `?sortBy=${sortBy}&order=${order}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch category products.");
      }
      const data = await res.json();
      //console.log('Api:' , data);

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategoryProducts(state) {
      state.products = [];
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
        //console.log("APi: ", action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
        //console.log("Product By Category: ", action.payload);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryProducts } = categorySlice.actions;
export default categorySlice.reducer;
