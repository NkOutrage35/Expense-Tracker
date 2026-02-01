import { createContext, useContext, useState } from "react";
import { transactions as mockTransactions } from "../data/mockData";

const AddTransaction = createContext(null);

export const TransactionAdder = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <AddTransaction.Provider value={{ transactions, addTransaction }}>
      {children}
    </AddTransaction.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(AddTransaction);
  if (!context) {
    throw new Error("useTransactions must be used inside TransactionAdder");
  }
  return context;
};
