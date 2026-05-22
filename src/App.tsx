import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from './layout/mainLayout';
import { Dashboard } from './features/dashboard/dashboard';
import { Order } from './features/order/order';
import Payment from './features/payment/payment';
import {Login} from './features/auth/login';
import { StoreDirectory } from "./features/store-directory/storeDirectoty";
import { StoreDirectoryDetails } from "./features/store-directory/storeDiredtoryDetails";
import { StoreDirectoryProducts } from "./features/store-directory/storeDirectoryProducts";
import { StoreDirectoryOrders } from "./features/store-directory/storeDirectoryOrders";
import { UserManagement } from "./features/users/users";
import { UserDetailsProfile } from "./features/users/userDetailsProfile";
import { UserDetailsStore } from "./features/users/userDetailsStore";
import { UserDetailsSessions } from "./features/users/userDetailsSessions";
import { AdminRoute } from "./features/auth/authRoute";
import { Infrastructure } from "./features/settings/infrastructure";
import { PlatformSettings } from "./features/settings/platformSettings";
import { AdminSettings } from "./features/settings/AdminSettings";
import Revenue from "./features/revenue/revenue";
import RevenueDashboard from "./features/revenue/revenueDashboard";
import RevenueDetails from "./features/revenue/revenueDetails";
import PayoutScheduler from "./features/revenue/payoutScheduler";
import { OrderDetails } from "./features/order/ordersDetails";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        // Redirect root to login
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path='/admin-login' element= {<Login/>} /> 
        
        <Route  path='dashboard/*'
         element={
             <MainLayout/>
          }>
          <Route index element= {<Dashboard/>} />
          <Route path='order' element= {<Order/>} />
          <Route path='order/:orderId' element= {<OrderDetails/>} />
          <Route path='payment' element= {<Payment/>} />
          <Route path='store-directory' element= {<StoreDirectory/>} />
          <Route path='store-directory/:storeId' element= {<StoreDirectoryDetails/>} />
          <Route path='store-directory/:storeId/products' element= {<StoreDirectoryProducts/>} />
          <Route path='store-directory/:storeId/orders' element= {<StoreDirectoryOrders/>} />
          <Route path='user-management' element= {<UserManagement/>} />
          <Route path='user-management/:userId' element={<UserDetailsProfile/>} />
          <Route path='user-management/:userId/stores' element={<UserDetailsStore/>} />
          <Route path='user-management/:userId/sessions' element={<UserDetailsSessions/>} />
          <Route path='revenue' element={<Revenue/>} />
          <Route path='revenue/dashboard' element={<RevenueDashboard />} />
          <Route path='revenue/payout-scheduler' element={<PayoutScheduler />} />
          <Route path='revenue/store/:storeId' element={<RevenueDetails />} />
          <Route path='settings' element= {<Infrastructure/>} />
          <Route path ='settings/platform-settings' element={<PlatformSettings/>} />
          <Route path='settings/admin-team' element={<AdminSettings/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
