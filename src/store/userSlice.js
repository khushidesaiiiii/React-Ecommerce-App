import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users?limit=200`);
      if (!res.ok) {
        throw new Error("Can't fetch users");
      }
      const data = await res.json();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addUser = createAsyncThunk(
  "users/addusers",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Can't add a user");
      }
      return await res.json();
    } catch (errr) {
      return rejectWithValue(errr.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        throw new Error("Can't update the user");
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Can't Delete the user");
      }
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/search?q=${query}&limit=200`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch searched user");
      }
      return data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const sortUsers = createAsyncThunk(
  "users/sortUsers",
  async ({ sortBy, order }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/users?sortBy=${sortBy}&order=${order}&limit=200`,
      );
      if (!res.ok) {
        throw new Error("Sort Failed");
      }
      const data = await res.json();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const filterUsers = createAsyncThunk(
  "users/fiterUsers",
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/users/filter?key=${key}&value=${value}&limit=200`,
      );
      if (!res.ok) {
        throw new Error("Cannot filter users");
      }
      const data = await res.json();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // console.log("List", action.payload);
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list.unshift(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.id !== action.payload);
      })

      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // console.log(action.payload);
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sortUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sortUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        //console.log(action.payload);
      })
      .addCase(sortUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(filterUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(filterUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
