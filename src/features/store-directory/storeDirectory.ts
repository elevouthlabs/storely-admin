import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { 
   StoreState, 
   StoreResponse,
   SingleStoreResponse, 
   StoreProductResponse,
   StoreOrderResponse} from "../store-directory/storeDirectory.type";
import type { RootState } from "../../store/store";

const initialState: StoreState = {
  stores: [],
  products: [],
  orders: [],
  store: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  isLoading: false,
  isFetchingOne: false,
  error: null,
};


export const fetchStores = createAsyncThunk<
 StoreResponse,                          // return type
  { page?: number; limit?: number; search?: string;}, // params
  {rejectValue: string; state: RootState}>(
    "storeDirectory/fetchStoreDirectory",
    async (params, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token;    
        const query = new URLSearchParams({
          ...(params.page !== undefined && { page: String(params.page) }),
          ...(params.limit !== undefined && { limit: String(params.limit) }),
          ...(params.search !== undefined && { search: params.search }),
        }).toString();
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/stores?${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        const data: StoreResponse = await res.json();

         if (!res.ok) {
          return rejectWithValue(data.message);
        }
        return data;
      } catch (error) {
        return rejectWithValue("Failed to fetch store directory");
      }
    }
  );

export const fetchStoreById = createAsyncThunk<
  SingleStoreResponse,
  string, 
  { rejectValue: string; state: RootState }
>(
  "stores/fetchStorerById",
  async (storeId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/single/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: SingleStoreResponse = await res.json();
 
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch user");
    }
  }
);
export const fetchStoreProduct = createAsyncThunk<
  StoreProductResponse,
  string, 
  { rejectValue: string; state: RootState }
>(
  "stores/fetchStoreProduct",
  async (storeId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/products/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: StoreProductResponse = await res.json();
         
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch user");
    }
  }
);
export const fetchStoreOrders = createAsyncThunk<
  StoreOrderResponse,
  string, 
  { rejectValue: string; state: RootState }
>(
  "stores/fetchStoreOrders",
  async (storeId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/orders/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: StoreOrderResponse = await res.json();

      console.log("PRODUCT RESPONSE:", data);
         
      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch {
      return rejectWithValue("Failed to fetch user");
    }
  }
);


export const suspendStore = createAsyncThunk(
  "stores/suspendStore",
  async (
    {
      storeId,
      reason,
      noteToSeller,
    }: {
      storeId: string;
      reason: string;
      noteToSeller: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/suspend/${storeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason,
            noteToSeller,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
      return rejectWithValue(data.message || "Failed to suspend store");
    }

      return data;
    } catch (error) {
       console.log("BACKEND ERROR:", error);
      return rejectWithValue("Failed to suspend store");
    }
  }
);

export const SendMessage = createAsyncThunk(
  "stores/send-message",
  async (
    {
      storeId,

      subject,
      message
    }: {
      storeId: string;
      subject: string;
      message: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/send-message/${storeId}`,
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
      return rejectWithValue(data.message || "Failed to message to store");
    }

      return data;
    } catch (error) {
      return rejectWithValue("Failed to send message to store");
    }
  }
);

export const verifyStore = createAsyncThunk(
  "stores/verifyStore",
  async (
    storeId: string,
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/store/verify/${storeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        return rejectWithValue(
          data.message || "Failed to verify store"
        );
      }

      return data;
    } catch {
      return rejectWithValue("Failed to verify store");
    }
  }
);

const storeSlice = createSlice({
  name: "stores",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
     .addCase(fetchStores.pending, (state) => {
      state.isLoading = true;     
      state.error = null;
    })
    .addCase(fetchStores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stores = action.payload.data.stores;
      state.pagination = action.payload.data.pagination;
    })
    .addCase(fetchStores.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch stores";
    })

    //single store
     .addCase(fetchStoreById.pending, (state) => { 
      state.isFetchingOne = true   
      state.error = null;
    })
    .addCase(fetchStoreById.fulfilled, (state, action) => {
      state.isFetchingOne = false
      state.store = action.payload.data;
    })
    .addCase(fetchStoreById.rejected, (state, action) => {
      state.isFetchingOne = false;
      state.error = action.payload || "Failed to fetch store";
    })

    //single store products
     .addCase(fetchStoreProduct.pending, (state) => { 
      state.isFetchingOne = true   
      state.error = null;
    })
    .addCase(fetchStoreProduct.fulfilled, (state, action) => {
      state.isFetchingOne = false
      state.products = action.payload.data;
      state.pagination = action.payload.pagination;
    })
    .addCase(fetchStoreProduct.rejected, (state, action) => {
      state.isFetchingOne = false;
      state.error = action.payload || "Failed to fetch products";
    })
    //single store orders
     .addCase(fetchStoreOrders.pending, (state) => { 
      state.isFetchingOne = true   
      state.error = null;
    })
    .addCase(fetchStoreOrders.fulfilled, (state, action) => {
      state.isFetchingOne = false
      state.orders = action.payload.data;
      state.pagination = action.payload.pagination;
    })
    .addCase(fetchStoreOrders.rejected, (state, action) => {
      state.isFetchingOne = false;
      state.error = action.payload || "Failed to fetch orders";
    })

    //suspend store
      .addCase(suspendStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendStore.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(suspendStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //verify store
      .addCase(verifyStore.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(verifyStore.fulfilled, (state, action) => {
        state.isLoading = false;

       if (state.store && action.payload?.data) {
    state.store = action.payload.data;
  }
      })

      .addCase(verifyStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
          
  }

})

export default storeSlice.reducer