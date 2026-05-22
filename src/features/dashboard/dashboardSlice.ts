import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type DashboardMetrics = {
  totalStores: number;
  pendingUsers: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingPayments: number;
  completedPayments: number;
};

type DashboardState = {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  metrics: null,
  isLoading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk<
  DashboardMetrics,
  string,
  { rejectValue: string }
>("dashboard/fetchData", async (token, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/metrics/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message);
    }

    return data.data;
  } catch {
    return rejectWithValue("Failed to fetch dashboard data");
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dashboardSlice.reducer;