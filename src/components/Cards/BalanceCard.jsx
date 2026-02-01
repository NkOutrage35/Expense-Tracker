import React from "react";
import {
  MoreHorizontal,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ChevronUp,
} from "lucide-react";

const BalanceCard = ({ total = 0, income = 0, expense = 0 }) => {
  return (
    <div className="bg-[#2F7E79] p-6 rounded-3xl shadow-2xl text-white w-full max-w-md mx-auto">
      {/* Total Balance Header */}
      <div className="flex justify-between">
        <div className="flex items-center mb-2">
          <p className="text-lg font-medium opacity-95 pr-1">Total Balance </p>
          <ChevronUp size={20} />
        </div>
        <MoreHorizontal size={30} />
      </div>
      <h2 className="text-3xl font-bold mb-8">${total.toLocaleString()}</h2>

      <div className="flex justify-between">
        {/* Income */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 opacity-80">
            <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center">
              <ArrowDown size={12} strokeWidth={3} />
            </div>
            <span className="text-lg">Income</span>
          </div>
          <p className="text-3xl font-semibold">${income.toLocaleString()}</p>
        </div>

        {/* Expense */}
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-2 opacity-80">
            <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center">
              <ArrowUp size={12} strokeWidth={3} />
            </div>
            <span className="text-lg">Expense</span>
          </div>
          <p className="text-3xl font-semibold text-left">
            ${expense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
