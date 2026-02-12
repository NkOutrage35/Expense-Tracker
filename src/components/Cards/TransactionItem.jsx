import React from "react";
import { ArrowLeftRight } from "lucide-react";

const TransactionItem = ({
  name,
  date,
  amount,
  type,
  image,
  showPayButton = false,
  onClick,
  onPay,
}) => {
  const isIncome = type === "income";

  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center py-4 px-2 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded-2xl w-12 h-12 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-8 h-8 object-contain" />
          ) : (
            <ArrowLeftRight size={20} className="text-gray-500" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-gray-800 font-bold text-base">{name}</span>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {showPayButton ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onPay) onPay();
            }}
            className="bg-[#EEF7F6] text-[#438883] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#e0f0ee] transition-colors"
          >
            Pay
          </button>
        ) : (
          <div
            className={`text-lg font-bold ${
              isIncome ? "text-[#438883]" : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}$
            {Math.abs(amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
