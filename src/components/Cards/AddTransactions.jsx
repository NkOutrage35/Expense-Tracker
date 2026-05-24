import { createContext, useContext, useState, useEffect } from "react";

import { transactions as mockTransactions } from "../data/mockData";

const AddTransaction = createContext(null);

export const TransactionsContext = ({ children }) => {
  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  // LocalStorage

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("mono_tracker_txs"); //load disk

      if (saved) {
        return JSON.parse(saved); // parse saved string to array
      }
    } catch (error) {
      console.error("Failed to parse Saved Transcations:", error);
    }

    return mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem("mono_tracker_txs", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AddTransaction.Provider value={{ transactions, addTransaction }}>
      {children}
    </AddTransaction.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(AddTransaction);

  if (!context) {
    throw new Error("useTransactions must be used inside TransactionsContext ");
  }

  return context;
};
