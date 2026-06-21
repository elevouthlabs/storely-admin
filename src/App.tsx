import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from './layout/mainLayout';
import { Dashboard } from './features/dashboard/dashboard';
import Order from './features/order/order';
// import Payment from './features/payment/payment';
import {Login} from './features/auth/login';
import { StoreDirectory } from "./features/store-directory/storeDirectoty";
import { StoreDirectoryDetails } from "./features/store-directory/storeDiredtoryDetails";
import { StoreDirectoryProducts } from "./features/store-directory/storeDirectoryProducts";
import { StoreDirectoryOrders } from "./features/store-directory/storeDirectoryOrders";
import { UserManagement } from "./features/users/users";
import { UserDetailsProfile } from "./features/users/userDetailsProfile";
import { UserDetailsStore } from "./features/users/userDetailsStore";
import { UserDetailsSessions } from "./features/users/userDetailsSessions";
import { Infrastructure } from "./features/settings/infrastructure";
import { PlatformSettings } from "./features/settings/platformSettings";
import { AdminSettings } from "./features/settings/AdminSettings";
import Revenue from "./features/revenue/revenue";
import RevenueDashboard from "./features/revenue/revenueDashboard";
import RevenueDetails from "./features/revenue/revenueDetails";
import PayoutScheduler from "./features/revenue/payoutScheduler";
import { OrderDetails } from "./features/order/ordersDetails";
import Campaign from "./features/campaign/campaign";
import { NewCampaign } from "./features/campaign/newCampaign";
import {Product} from "./features/campaign/tabs/product"
import Moderation from "./features/moderation/moderation";
// import OTPVerification from "./features/auth/OTPrequire";
import ModerationDetails from "./features/moderation/moderationDetails";
import { ForgetPass } from "./features/auth/forgetPass";
import { CheckMail } from "./features/auth/checkMail";
import { Receipt } from "./features/order/modal/receipt";




function App() {

  return (
    <BrowserRouter>
      <Routes>
        // Redirect root to login
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path='/admin-login' element= {<Login/>} /> 
        {/* <Route path='/admin/otp/verification' element= {<OTPVerification/>} />  */}
        <Route path='/admin/forgetpassword' element= {<ForgetPass/>} /> 
        <Route path='/admin/passwordreset' element= {<CheckMail/>} /> 
        
        <Route  path='dashboard/*'
         element={
             <MainLayout/>
          }>
          <Route index element= {<Dashboard/>} />
          <Route path='order' element= {<Order/>} />
          <Route path='order/receipt' element= {<Receipt/>} />
          <Route path='order/:orderId' element= {<OrderDetails/>} />
          {/* <Route path='payment' element= {<Payment/>} /> */}
          <Route path='store-directory' element= {<StoreDirectory/>} />
          <Route path='store-directory/:storeId' element= {<StoreDirectoryDetails/>} />
          <Route path='store-directory/:storeId/products' element= {<StoreDirectoryProducts/>} />
          <Route path='store-directory/:storeId/orders' element= {<StoreDirectoryOrders/>} />
          <Route path='user-management' element= {<UserManagement/>} />
          <Route path='user-management/:userId' element={<UserDetailsProfile/>} />
          <Route path='user-management/:userId/stores' element={<UserDetailsStore/>} />
          <Route path='user-management/:userId/sessions' element={<UserDetailsSessions/>} />
          <Route path='risk-moderation' element={<Moderation/>} />
          <Route path='risk-moderation/details/:itemName' element={<ModerationDetails/>} />
          <Route path='campaign' element={<Campaign/>} />
          <Route path='campaign/new' element={<NewCampaign/>} />
          <Route path='campaign/new/product' element={<Product/>} />
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
