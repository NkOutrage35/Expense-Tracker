import React, { useState, useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import AddExpense from "./pages/AddExpense";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import TransactionDetails from "./pages/TransactionDetails";
import BillDetails from "./pages/BillDetails";
import ConnectWallet from "./pages/ConnectWallet";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import SendMoney from "./pages/SendMoney";
import TransactionItem from "./components/Cards/TransactionItem";
import { TransactionAdder } from "./components/Cards/AddTransactions";
import BillConfirmation from "./pages/BillConfirmation";
import NotFound from "./pages/404";
import AccountInfo from "./components/profile/AccountInfo";
import PersonalProfile from "./components/profile/PersonalProfile";
import MessageCenter from "./components/profile/MessageCenter";
import LoginSecurity from "./components/profile/Login_Security";
import DataPrivacy from "./components/profile/Data_Privacy";

function App() {
  return (
    <TransactionAdder>
      <div className="font-sans">
        <Routes>
          {/* onboarding */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route element={<MainLayout />}>
            {/* Main naviagation */}
            <Route path="/home" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/send" element={<SendMoney />}></Route>
            <Route
              path="/billConfirmation"
              element={<BillConfirmation />}
            ></Route>


            {/* Profile navigation */}
            <Route path="/account" element={<AccountInfo />}></Route>
            <Route path="/dataPrivacy" element={<DataPrivacy />}></Route>
            <Route path="/security" element={<LoginSecurity />}></Route>
            <Route path="/messageCenter" element={<MessageCenter />}></Route>
            <Route path="/personal" element={<PersonalProfile />}></Route>

            {/* Dynamic navigation */}
            <Route path="/transaction/:id" element={<TransactionDetails />} />
            <Route path="/bill/:id" element={<BillDetails />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route
              path="/paymentConfirmation/:id"
              element={<PaymentConfirmation />}
            ></Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </TransactionAdder>
  );
}

export default App;
