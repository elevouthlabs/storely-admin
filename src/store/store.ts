import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/userSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import storeDirectoryReducer from "../features/store-directory/storeDirectory"
import OrdersReducer from "../features/order/orderSlice"
import RevenueReducer from "../features/revenue/revenueSlice"
import ModerationReducer from "../features/moderation/moderationSlice"

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        users: usersReducer,
        dashboard: dashboardReducer,
        stores: storeDirectoryReducer,
        orders: OrdersReducer,
        revenues: RevenueReducer,
        moderations: ModerationReducer
    }),
    devTools: true,

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;