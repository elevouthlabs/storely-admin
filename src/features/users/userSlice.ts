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

export const banUSer = createAsyncThunk(
  "user/ban",
  async (
     {
      userId,
      reason,
      noteToSeller
    }: {
      userId: string;
      reason: string;
      noteToSeller: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/ban/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
           body: JSON.stringify({
            reason,
            noteToSeller
          }),
        }
      );
  
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to ban user"
        );
      }

      return data;
    } catch(error) {
      return rejectWithValue("Failed to ban user");
    }
  }
);

export const warnUser = createAsyncThunk(
  "user/warn-user",
  async (
     {
      userId,
      message,
    }: {
      userId: string;
      message: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const res = await fetch(
         `${import.meta.env.VITE_API_URL}/admin/users/warn/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({message})
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to warn user"
        );
      }

      return data;
    } catch(error) {
      console.error(error)
      return rejectWithValue("Failed to warn user");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "user/send-message",
  async (
    {
      userId,
      subject,
      message
    }: {
      userId: string;
      subject: string;
      message: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/send-message/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject,
            message
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
      return rejectWithValue(data.message || "Failed to message to user");
    }

      return data;
    } catch (error) {
      return rejectWithValue("Failed to send message to user");
    }
  }
);
export const forcePassword = createAsyncThunk(
  "user/force-password",
  async (
    {
      userId,
      reason
    }: {
      userId: string;
      reason: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/force-password-reset/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
      return rejectWithValue(data.message || "Failed to reset user password");
    }

      return data;
    } catch (error) {
      return rejectWithValue("Failed to reset to user password");
    }
  }
);
export const changlePlan = createAsyncThunk(
  "user/change-plan",
  async (
    {
      userId,
      plan
    }: {
      userId: string;
      plan: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users/change-plan/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
      return rejectWithValue(data.message || "Failed to change user plan");
    }

      return data;
    } catch (error) {
      return rejectWithValue("Failed to change to user plan");
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
      })

    //suspend store
      .addCase(banUSer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(banUSer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(banUSer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

       //verify store
      .addCase(warnUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(warnUser.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(warnUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //send message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      

      //passord reset
      .addCase(forcePassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(forcePassword.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(forcePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //change plan
      .addCase(changlePlan.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(changlePlan.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(changlePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
});

export default usersSlice.reducer;