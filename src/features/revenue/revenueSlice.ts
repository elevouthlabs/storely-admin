
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RevenueResponse, RevenueState, SingleRevenueResponse } from "./revenue.type";
import type { RootState } from "../../store/store";


const initialState: RevenueState = {
  revenues: [],
  revenue: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  isLoading: false,
  isFetchingOne: false,
  isUpdating: false,

  error: null,
};

export const fetchRevenue = createAsyncThunk<
  RevenueResponse,                          // return type
  { page?: number; limit?: number; search?: string; status?: string }, // params
  { rejectValue: string; state: RootState }
>(
  "revenues/fetchRevenues",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const query = new URLSearchParams({
        ...(params.page !== undefined && { page: String(params.page) }),
        ...(params.limit !== undefined && { limit: String(params.limit) }),
        // ...(params.search !== undefined && { search: params.search }),
        // ...(params.status !== undefined && { status: params.status }),
      }).toString();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/revenue?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: RevenueResponse = await res.json();
      console.log(data);
      

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch revenue");
    }
  }
);

export const fetchRevenueById = createAsyncThunk<
  SingleRevenueResponse,
  string, // revenueId
  { rejectValue: string; state: RootState }
>(
  "revenues/fetchRevenueById",
  async (storeId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/revnue/${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: SingleRevenueResponse = await res.json();
      console.log(data);
      

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch order");
    }
  }
);

export const updateRevenueStatus = createAsyncThunk<
  SingleRevenueResponse,
  { orderId: string; status: string },
  { rejectValue: string; state: RootState }
>(
  "revenue/updateStatus",
  async ({ storeId, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${storeId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data: SingleRevenueResponse = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to update status");
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 FETCH revenue
      .addCase(fetchRevenue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenues = action.payload.data.revenues;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error fetching revenue";
      })

      // 🔹 FETCH SINGLE ORDER
      .addCase(fetchRevenueById.pending, (state) => {
        state.isFetchingOne = true;
        state.error = null;
      })
      .addCase(fetchRevenueById.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        state.revenue = action.payload.data;
      })
      .addCase(fetchRevenueById.rejected, (state, action) => {
        state.isFetchingOne = false;
        state.error = action.payload ?? "Error fetching revenue";
      })

      // 🔹 UPDATE STATUS
      .addCase(updateRevenueStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateRevenueStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.revenue = action.payload.data;

        // update in list too (important!)
        const index = state.revenue.findIndex(
          (o) => o.id === action.payload.data.id
        );
        if (index !== -1) {
          state.revenue[index] = action.payload.data;
        }
      })
      .addCase(updateRevenueStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload ?? "Error updating status";
      });
  },
});

export default revenueSlice.reducer;