import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { OrdersResponse, OrdersState, SingleOrderResponse } from "./orders.type";
import type { RootState } from "../../store/store";


const initialState: OrdersState = {
  orders: [],
  order: null,

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

export const fetchOrders = createAsyncThunk<
  OrdersResponse,                          // return type
  { page?: number; limit?: number; search?: string; status?: string }, // params
  { rejectValue: string; state: RootState }
>(
  "orders/fetchOrders",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const query = new URLSearchParams({
        ...(params.page !== undefined && { page: String(params.page) }),
        ...(params.limit !== undefined && { limit: String(params.limit) }),
        ...(params.search !== undefined && { search: params.search }),
        ...(params.status !== undefined && { status: params.status }),
      }).toString();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/orders-all?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: OrdersResponse = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const fetchOrderById = createAsyncThunk<
  SingleOrderResponse,
  string, // orderId
  { rejectValue: string; state: RootState }
>(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: SingleOrderResponse = await res.json();

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

export const updateOrderStatus = createAsyncThunk<
  SingleOrderResponse,
  { orderId: string; status: string },
  { rejectValue: string; state: RootState }
>(
  "orders/updateStatus",
  async ({ orderId, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data: SingleOrderResponse = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to update status");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data.orders;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error fetching orders";
      })

      // 🔹 FETCH SINGLE ORDER
      .addCase(fetchOrderById.pending, (state) => {
        state.isFetchingOne = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        state.order = action.payload.data;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isFetchingOne = false;
        state.error = action.payload ?? "Error fetching order";
      })

      // 🔹 UPDATE STATUS
      .addCase(updateOrderStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.order = action.payload.data;

        // update in list too (important!)
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.data.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload ?? "Error updating status";
      });
  },
});

export default ordersSlice.reducer;