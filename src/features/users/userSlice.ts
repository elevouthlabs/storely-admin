import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UsersResponse,
   UsersState,
   SingleUserResponse,
   UserSessionResponse
  } from "./users.type";
import type { RootState } from "../../store/store";


const initialState: UsersState = {
  users: [],
  session: [],
  user: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  isLoading: false,
  isFetchingOne: false,

  error: null,
};

export const fetchUsers = createAsyncThunk<
 UsersResponse,                          // return type
  { page?: number; limit?: number; search?: string;}, // params
  { rejectValue: string; state: RootState }
>(
  "users/fetchUsers",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const query = new URLSearchParams({
        ...(params.page !== undefined && { page: String(params.page) }),
        ...(params.limit !== undefined && { limit: String(params.limit) }),
        ...(params.search !== undefined && { search: params.search }),
      }).toString();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/all?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: UsersResponse = await res.json();
      
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const fetchUserById = createAsyncThunk<
  SingleUserResponse,
  string, 
  { rejectValue: string; state: RootState }
>(
  "users/fetchUserById",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/single/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: SingleUserResponse = await res.json();
 
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

export const fetchSessionById = createAsyncThunk<
  UserSessionResponse,
  string, 
  { rejectValue: string; state: RootState }
>(
  "users/fetchSessionById",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/sessions/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: UserSessionResponse = await res.json();

      console.log(data);
      
 
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;     
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.users;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })
      
      // single user
      .addCase(fetchUserById.pending, (state) => {
        state.isFetchingOne = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isFetchingOne = false;
        state.error = action.payload || "Failed to fetch user details";
      })

      // single user session
      .addCase(fetchSessionById.pending, (state) => {
        state.isFetchingOne = true;
        state.error = null;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        state.session = action.payload.data;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.isFetchingOne = false;
        state.error = action.payload || "Failed to fetch user details";
      });
  }
});

export default usersSlice.reducer;