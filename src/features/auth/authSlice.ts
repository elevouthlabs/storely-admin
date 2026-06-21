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
  pendingEmail:null,
  pendingUserId: null,
  isLoading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      localStorage.setItem(
        "token",
        data.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      return {
        // userId: data.user.id,
        // email: data.user.email,
        user: data.user,
        token: data.accessToken,
      };
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);
//verify-otp
// export const verifyOTP = createAsyncThunk(
//   "auth/verifyOTP",
//   async (
//     {
//       userId,
//       otp,
//     }: {
//       userId: string;
//       otp: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//             otp,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data.message);
//       }

//       localStorage.setItem(
//         "token",
//         data.accessToken
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//       );

//       return data;
//     } catch {
//       return rejectWithValue("OTP verification failed");
//     }
//   }
// );

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.message;
    } catch {
      return rejectWithValue("Failed to send reset link");
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
        // state.pendingUserId = action.payload.userId;
        // state.pendingEmail = action.payload.email;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //verify-otp
      // .addCase(verifyOTP.fulfilled, (state, action) => {
      //   state.isLoading = false;

      //   state.user = action.payload.user;
      //   state.token = action.payload.accessToken;

      //   state.pendingUserId = null;
      //   state.pendingEmail = null;

      //   state.isAuthenticated = true;
      // })
      // .addCase(verifyOTP.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })
      //  .addCase(verifyOTP.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // //forgot-password
      // .addCase(forgotPassword.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;