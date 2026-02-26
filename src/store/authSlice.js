import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
const baseUrl = import.meta.env.VITE_BASE_URL; 

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginRes = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,   
        }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        throw new Error(loginData.message || "Login failed");
      }
      debugger;
      const userRes = await fetch (`${baseUrl}/users/${loginData.id}`);
      const userData = await userRes.json();
      if(!userRes.ok){
        throw new Error("failed to fetch id");
      }

      return {...loginData, role: userData.role || "user"};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Signup failed");
      }


      return { ...data, role: "user", token: "dummy-token" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    token:  Cookies.get("token") || null,
    loading: false,
    error: null,
    role: user?.role || null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.role = null;
      localStorage.removeItem("user");
      Cookies.remove('token');
    },
  },
  extraReducers: (Builder) => {
    Builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.role = action.payload.role ;
        state.user = action.payload;
        state.token = action.payload.token;
        // console.log("Role: ", action.payload.role);
        localStorage.setItem("user", JSON.stringify(action.payload));
        Cookies.set("token", action.payload.token, {
          expires: 1,
          sameSite: 'strict',
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import {createSlice} from '@reduxjs/toolkit';

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null,
//         token: null
//     },
//     reducers: {
//         setUser : (state, action) => {
//             state.user = action.payload;
//             state.token = action.payload?.token;
//             state.role = action.payload.role
//         },
//         logout : (state) => {
//             state.user = null;
//             state.token = null;
//             state.roll = null;
//         }
//     }
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;
