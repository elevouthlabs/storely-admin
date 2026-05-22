import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store/strore.type';
import type { PaymentsState, PaymentsResponse, SinglePaymentResponse } from './payment.types';

const initialState: PaymentsState = {
  payments: [],
  payment: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  isLoading: false,
  isFetchingOne: false,

  error: null,
};

export const fetchPayment = createAsyncThunk<
PaymentsResponse,
{ page?: number; limit?: number; search?: string;},
 {rejectValue: string, state: RootState}>(
 "payment/fetchPayment",
    async(params, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;

            const query = new URLSearchParams({
            ...(params.page !== undefined && { page: String(params.page) }),
            ...(params.limit !== undefined && { limit: String(params.limit) }),
            ...(params.search !== undefined && { search: params.search }),
            }).toString();

            const res = await fetch(`http://localhost:5000/api/orders?${query}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data: PaymentsResponse = await res.json();

            if(!res.ok){
                return rejectWithValue(data.message);
            }
            return data;
        }catch(error){
            return rejectWithValue("Failed to fetch payment");
        }
    }
)

export const fetchPaymentById = createAsyncThunk<
SinglePaymentResponse,
string,
{rejectValue: string, state: RootState}>(
    "payment/fetchPaymentById",
    async(orderId, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const res = await fetch(`http://localhost:5000/api/orders/${orderId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            if(!res.ok){
                return rejectWithValue(data.message);
            }
            return data;
        }catch(error){
            return rejectWithValue("Failed to fetch payment");

        }
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState : initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPayment.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchPayment.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.payments = action.payload.data.payments;
            state.pagination = action.payload.data.pagination;
        })
        .addCase(fetchPayment.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload ?? "Error fetching payment";
        })

        // 🔹 FETCH SINGLE PAYMENT

        .addCase(fetchPaymentById.pending, (state)=>{
            state.isFetchingOne = true;
            state.error = null;
        })
        .addCase(fetchPaymentById.fulfilled, (state, action)=>{
            state.isFetchingOne = false;
            state.payment = action.payload.data;
        })
        .addCase(fetchPaymentById.rejected, (state, action)=>{
            state.isFetchingOne = false;
            state.error = action.payload ?? "Error fetching payment details";
        })
    }
    
})

export default paymentSlice.reducer;