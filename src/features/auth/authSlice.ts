import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "../auth/auth.type";

//  STORAGE
const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");


//  INITIAL STATE 
const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  isLoading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, {rejectWithValue}) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();      

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      const token = data.accessToken;
      const user = data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        user: data.user,
        accessToken: data.accessToken,
      };
    } catch (error: any) {
      return rejectWithValue("Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      //  LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;