import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BalanceCard from "../components/Cards/BalanceCard";
import TransactionItem from "../components/Cards/TransactionItem";
import TransactionDetails from "./TransactionDetails";
import BottomNav from "../components/navigation/BottomNav";
import AddExpense from "./AddExpense";
import { useTransactions } from "../components/Cards/AddTransactions";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";

import {
  transactions as mockTransactions,
  userProfile,
} from "../components/data/mockData";

const Home = ({ navigate }) => {
  // STATE owns transactions
  const { transactions } = useTransactions();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [seeAll, setSeeAll] = useState(false);

  const sendAgain = transactions
    .filter((t) => t.type === "expense")
    .slice(0, 5);

  // to show whole array if seeall is True.
  const displayTransactions = seeAll ? transactions : transactions.slice(0, 4);

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative h-60">
        <img
          src={Rectangle9}
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="bg"
        />
        <img
          src={Group6}
          className="absolute inset-0 w-52 object-cover z-0"
          alt="decor"
        />

        <div className="sticky z-10">
          <Header guest={userProfile.name} isDarkMode />
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 relative -mt-26 z-10">
        <BalanceCard
          total={userProfile.balance}
          income={userProfile.income}
          expense={userProfile.expenses}
          className="shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="bg-white grow px-4 pt-8 pb-24 rounded-t-4xl -mt-6">
        {/* Transactions */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-800">
            Transactions History
          </h3>
          <button
            // seeAll toggle
            onClick={() => setSeeAll(!seeAll)}
            className="text-sm text-gray-400 font-medium cursor-pointer hover:opacity-70"
          >
            {seeAll ? "Show less" : "See all"}
          </button>
        </div>

        <div className="space-y-3">
          {displayTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              name={item.name}
              date={item.date}
              amount={item.amount}
              type={item.type}
              image={item.image}
              onClick={() => setSelectedTransaction(item)}
            />
          ))}

          {transactions.length === 0 && (
            <p className="text-center text-gray-400 py-4">No Transactions...</p>
          )}
        </div>

        {/* Send Again */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Send Again</h3>
            <button className="text-base font-light text-gray-500">
              See All
            </button>
          </div>

          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
            {displayTransactions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center min-w-18"
              >
                <img
                  src={item.image}
                  alt={item.fromTo}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <span className="text-sm mt-2 text-gray-700 truncate">
                  {item.fromTo?.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav currentView="home" />
      </div>
    </div>
  );
};

export default Home;
