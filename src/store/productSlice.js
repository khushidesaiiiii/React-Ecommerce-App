import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      let url = `${baseUrl}/products?limit=200`;

      // if (sortBy && order) {
      //   url += `?sortBy=${sortBy}&order=${order}`;
      // }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("failed to load");
      }
      const data = await res.json();
      return data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const res = await fetch(`${baseUrl}/products/${id}`);
    return await res.json();
  },
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/search?q=${query}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch searched product");
      }
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete Failed");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
    return id;
  },
);

export const sortProducts = createAsyncThunk(
  "products/sortProducts",
  async ({ sortBy = "title", order = "asc" }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&limit=200`,
      );
      const data = await res.json();
      return data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    productDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetails(state) {
      state.productDetails = null;
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load Products";
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load Products";
      })

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // console.log(action.payload);
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("DELETE PAYLOAD:", action.payload);
        console.log("BEFORE:", state.list.length);

        state.list = state.list.filter((p) => p.id !== action.payload);

        console.log("AFTER:", state.list.length);
      })

    .addCase(sortProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sortProducts.rejected, (state,action) => {
      state.loading = false;
      state.error= action.payload;
    })
    .addCase(sortProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
