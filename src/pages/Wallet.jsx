import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import TransactionItem from "../components/Cards/TransactionItem";
import ActionButton from "../components/Cards/ActionButton";
import TransactionDetails from "./TransactionDetails";
import ConnectWallet from "./ConnectWallet";
import SendMoney from "./SendMoney";
import { SendHorizontal, Grid2x2Plus, Plus } from "lucide-react";
import { userProfile } from "../components/data/mockData";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../components/Cards/AddTransactions";

const Wallet = ({ onBack }) => {
  const { transactions } = useTransactions();

  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [activeBtn, setActiveBtn] = useState("cards");
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/add");
  };

  // Derive upcoming bills from transactions
  const billsData = transactions.filter((tx) => tx.category === "Subscription");

  // Transaction Details View
  if (selectedTransaction) {
    return (
      <TransactionDetails
        transaction={selectedTransaction}
        onBack={() => setSelectedTransaction(null)}
        navigate={navigate}
      />
    );
  }

  if (activeBtn === "ConnectWallet") {
    return (
      <ConnectWallet onBack={() => setActiveBtn("cards")} navigate={navigate} />
    );
  }
  if (activeBtn === "handleSend") {
    return (
      <SendMoney onBack={() => setActiveBtn("cards")} navigate={navigate} />
    );
  }

  const handleSend = () => {
    navigate("/send");
  };

  return (
    <div className="bg-[#429690] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="relative h-60">
        <img
          src="/images/Rectangle9.png"
          className="absolute inset-0 w-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group6.png"
          className="absolute inset-0 w-60 object-cover z-0"
          alt="decor"
        />
        <div className="relative z-10">
          <Header title="Wallet" showBack isDarkMode onBack={onBack} />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white grow rounded-t-[40px] px-6 pt-10 relative -top-20 flex flex-col pb-32">
        {/* Balance */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm font-medium">Total Balance</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-1">
            $
            {userProfile.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-10 mb-10">
          <ActionButton icon={Plus} label="Add" onClick={handleAdd} />
          <ActionButton
            icon={Grid2x2Plus}
            label="Pay"
            onClick={() => setActiveBtn("ConnectWallet")}
          />
          <ActionButton
            icon={SendHorizontal}
            label="Send"
            onClick={() => setActiveBtn("handleSend")}
          />
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 p-1 rounded-full flex mb-6">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              activeTab === "transactions"
                ? "bg-white shadow-sm text-gray-800"
                : "text-gray-400"
            }`}
          >
            Transactions
          </button>

          <button
            onClick={() => setActiveTab("bills")}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              activeTab === "bills"
                ? "bg-white shadow-sm text-gray-800"
                : "text-gray-400"
            }`}
          >
            Upcoming Bills
          </button>
        </div>

        {/* Transaction / Bills List */}
        <div className="space-y-2 grow">
          {activeTab === "transactions" ? (
            <>
              {transactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  name={tx.name}
                  date={tx.date}
                  amount={tx.amount}
                  type={tx.type}
                  image={tx.image}
                  onClick={() => setSelectedTransaction(tx)}
                />
              ))}
            </>
          ) : (
            <>
              {billsData.map((bill) => (
                <TransactionItem
                  key={bill.id}
                  name={bill.name}
                  date={bill.date}
                  amount={bill.amount}
                  type={bill.type}
                  image={bill.image}
                  showPayButton
                  onPay={() => {
                    navigate(`/bill/${bill.id}`, { state: { bill } });
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView="wallet" />
      </div>
    </div>
  );
};

export default Wallet;
