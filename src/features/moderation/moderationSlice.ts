import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { SingleModerationResponse, ModerationResponse, ModerationState } from "./moderation.type";


const initialState: ModerationState = {
  moderations: [],
  moderation: null,

  isLoading: false,
  isFetchingOne: false,
  error: null,
};

export const fetchStores = createAsyncThunk<
  ModerationResponse,
  void,
  { state: RootState; rejectValue: string }
>(
  "storeDirectory/fetchStoreDirectory",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/stores`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ModerationResponse = await res.json();
      console.log(data);
      

      if (!res.ok) {
        return rejectWithValue(data.message || "Request failed");
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch store directory");
    }
  }
);

export const fetchStoreById = createAsyncThunk<
  SingleModerationResponse,
  string,
  { state: RootState; rejectValue: string }
>(
  "storeDirectory/fetchStoreById",
  async (storeId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/stores/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: SingleModerationResponse = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch store");
      }

      return data;
    } catch  {
      return rejectWithValue("Failed to fetch store");
    }
  }
);

const moderationSlice = createSlice({
  name: "storeDirectory",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    // FETCH STORES
    builder
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moderations = action.payload.data.moderations;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });

    // FETCH STORE BY ID
    builder
      .addCase(fetchStoreById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moderation = action.payload.data;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default moderationSlice.reducer