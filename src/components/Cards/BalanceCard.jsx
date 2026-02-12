import React, { useState } from "react";
import {
  MoreHorizontal,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ChevronUp,
} from "lucide-react";

const BalanceCard = ({ total = 0, income = 0, expense = 0 }) => {
  // BalanceCard Expanase
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#2F7E79] p-5 rounded-3xl shadow-2xl text-white w-full max-w-md mx-auto">
      {/* Total Balance Header */}
      <div className="flex justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className="text-sm font-medium opacity-95 pr-1">Total Balance </p>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <MoreHorizontal size={30} />
      </div>
      {/* Total Balance */}
      <h2 className="text-3xl font-semibold mb-6">${total.toLocaleString()}</h2>

      {/* Expanding Section */}
      {isExpanded && (
        <div className="flex justify-between">
          {/* Income */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 opacity-80">
              <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center">
                <ArrowDown size={12} strokeWidth={3} />
              </div>
              <span className="text-lg">Income</span>
            </div>
            <p className="text-2xl font-medium">${income.toLocaleString()}</p>
          </div>

          {/* Expense */}
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-2 opacity-80">
              <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center">
                <ArrowUp size={12} strokeWidth={3} />
              </div>
              <span className="text-lg">Expense</span>
            </div>
            <p className="text-2xl font-medium text-left">
              ${expense.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
