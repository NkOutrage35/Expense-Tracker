import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BalanceCard from "../components/Cards/BalanceCard";
import TransactionItem from "../components/Cards/TransactionItem";
import BottomNav from "../components/navigation/BottomNav";
import AddExpense from "./AddExpense";
import { useTransactions } from "../components/Cards/AddTransactions";

import {
  transactions as mockTransactions,
  userProfile,
} from "../components/data/mockData";

const Home = ({ navigate }) => {
  // STATE owns transactions
  const { transactions } = useTransactions();
  const recentTransactions = transactions.slice(0, 4);

  const sendAgain = transactions
    .filter((t) => t.type === "expense")
    .slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative h-60">
        <img
          src="/images/Rectangle9.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group6.png"
          className="absolute inset-0 w-60 object-cover z-0"
          alt="decor"
        />

        <div className="sticky z-10">
          <Header guest={userProfile.name} isDarkMode />
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 relative -mt-24 z-10">
        <BalanceCard
          total={userProfile.balance}
          income={userProfile.income}
          expense={userProfile.expenses}
          className="shadow-3xl"
        />
      </div>

      {/* Content */}
      <div className="bg-white grow px-6 pt-8 pb-24 rounded-t-4xl -mt-6">
        {/* Transactions */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-800">
            Transactions History
          </h3>
          <button
            onClick={() => navigate("transactions")}
            className="text-sm text-gray-400 font-medium"
          >
            See all
          </button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              name={item.name}
              date={item.date}
              amount={item.amount}
              type={item.type}
              image={item.image}
            />
          ))}
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
            {sendAgain.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center min-w-18"
              >
                <img
                  src={item.image}
                  alt={item.fromTo}
                  className="w-16 h-16 rounded-full object-cover"
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
