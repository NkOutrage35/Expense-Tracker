import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import { ChevronUp, ChevronDown, Copy } from "lucide-react"; // 💡 FIXED: Added missing icons
import { usePDF } from "react-to-pdf";
import ReceiptPDF from "../components/PDF/ReceiptPDF";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";

const TransactionDetails = ({ transaction, onBack, navigate }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `Receipt_${transaction?.name || "Transaction"}.pdf`,
  });

  const [isExpanded, setIsExpanded] = useState(true);

  if (!transaction) return null;

  // 💡 FIXED: Added transactionId here so it is defined and won't crash your app
  const {
    id,
    name = "Unknown",
    type = "expense",
    amount = 0,
    date = "—",
    time = "—",
    fromTo = "—",
    fee = 0,
    image = "/images/user-profile.png",
    transactionId = `TXN-${transaction?.id || Date.now()}`,
  } = transaction;

  const isIncome = type === "income";

  const themeColor = isIncome ? "#438883" : "#EF4444";
  const badgeBg = isIncome ? "#EEF7F6" : "#FEE2E2";
  const dividerColor = "#E5E7EB";
  const mutedText = "#6B7280";
  const textMain = "#111827";

  return (
    <div className="bg-white  flex flex-col">
      {/* Header */}
      <div className="relative h-60">
        <div className="sticky top-0 z-50 bg-transparent">
          <Header
            title="Bill Details"
            showBack={true}
            isDarkMode={true}
            onBack={onBack}
            showOptions={true}
          />
        </div>
        <img
          src={Rectangle9}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <img
          src={Group6}
          className="absolute inset-0 w-52 object-cover opacity-90"
          alt=""
        />
      </div>

      {/* Main Container Sheet Card */}

      <div
        ref={targetRef}
        style={{ backgroundColor: "#FFFFFF", color: textMain }}
        className="bg-white flex-1 rounded-t-[40px] px-8 pt-16 pb-4 -mb-6 relative z-10 -mt-24 flex flex-col items-center shadow-2xl"
      >
        {/* Absolute Floating Avatar Badge Circle */}
        <div className="absolute -top-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white overflow-hidden z-20">
          <img
            src={image}
            className={
              name.toLowerCase() === "upwork"
                ? "w-12 h-12 object-contain"
                : "w-full h-full object-cover"
            }
            alt={name}
          />
        </div>

        {/* Income / Expense Dynamic Pill */}
        <span
          style={{ color: themeColor, backgroundColor: badgeBg }}
          className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
        >
          {isIncome ? "Income" : "Expense"}
        </span>

        {/* Big Amount Title Display */}
        <h2 className="mt-3 text-2xl font-bold">
          $ {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>

        {/* Dynamic Data Body Area */}
        <div className="w-full flex flex-col flex-1 mt-6">
          {/* Accordion Collapsible Action Bar Header */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center mb-4 focus:outline-none"
          >
            <h3 className="text-sm font-bold text-gray-900">
              Transaction details
            </h3>
            {isExpanded ? (
              <ChevronUp size={16} style={{ color: mutedText }} />
            ) : (
              <ChevronDown size={16} style={{ color: mutedText }} />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-3.5 bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
              <DetailRow
                label="Status"
                value="Completed"
                valueColor={themeColor}
              />
              <DetailRow
                label={isIncome ? "From" : "To"}
                value={fromTo || name}
              />
              <DetailRow label="Payment method" value="Debit Card" />
              <DetailRow label="Time" value={time} />
              <DetailRow label="Date" value={date} />

              <div className="flex justify-between items-center text-xs">
                <span style={{ color: mutedText }} className="font-medium">
                  Transaction ID
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <span className="truncate max-w-35">{transactionId}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(transactionId)}
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Copy size={14} className="text-[#438883]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="my-6 h-px bg-gray-100 flex-shrink-0" />

          {/* Financial Totals Calculations Card Section */}
          <div className="space-y-3.5 mb-6">
            <DetailRow
              label={isIncome ? "Earnings" : "Spending"}
              value={`$ ${amount.toFixed(2)}`}
            />
            <DetailRow label="Fee" value={`$ ${fee.toFixed(2)}`} />
            <div className="flex justify-between items-center pt-1 border-t border-dashed border-gray-200">
              <span style={{ color: mutedText }} className="font-bold text-sm">
                Total
              </span>
              <span className="font-bold text-lg text-gray-900">
                $ {(amount + fee).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Button: Download PDF Receipt */}

          <button
            type="button"
            onClick={toPDF}
            style={{
              borderColor: themeColor,
              color: themeColor,
            }}
            className="w-full py-4 mt-2 rounded-3xl border font-bold text-sm transition-all active:scale-[0.98] bg-white shadow-sm"
          >
            Download Receipt
          </button>
        </div>
      </div>

      {/* Hidden container target layer handling printing compilation exports */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <ReceiptPDF ref={targetRef} transaction={transaction} />
      </div>

      {/* Pinned Bottom Nav Framework Controller */}
      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex-shrink-0">
        <BottomNav navigate={navigate} currentView="wallet" />
      </div>
    </div>
  );
};

// Extracted atomic row component layout
const DetailRow = ({ label, value, valueColor = "#111827" }) => (
  <div className="flex justify-between items-center text-xs">
    <span style={{ color: "#6B7280" }} className="font-medium">
      {label}
    </span>
    <span style={{ color: valueColor }} className="font-semibold">
      {value}
    </span>
  </div>
);

export default TransactionDetails;
