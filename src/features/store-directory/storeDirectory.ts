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
          
  }

})

export default storeSlice.reducer