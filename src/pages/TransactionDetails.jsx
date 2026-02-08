import React from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import { ChevronUp } from "lucide-react";
import { usePDF } from "react-to-pdf";
import ReceiptPDF from "../components/PDF/ReceiptPDF";

const TransactionDetails = ({ transaction, onBack, navigate }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `Receipt_${transaction?.name || "Transaction"}.pdf`,
  });

  if (!transaction) return null;

  const {
    name = "Unknown",
    type = "expense",
    amount = 0,
    date = "—",
    time = "—",
    fromTo = "—",
    fee = 0,
    image = "/images/user-profile.png",
  } = transaction;

  const isIncome = type === "income";

  const themeColor = isIncome ? "#429690" : "#EF4444";
  const badgeBg = isIncome ? "#EEF7F6" : "#FEE2E2";
  const dividerColor = "#E5E7EB";
  const mutedText = "#6B7280";
  const textMain = "#111827";

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <div className="relative h-60">
        <img
          src="/images/Rectangle9.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <img
          src="/images/Group6.png"
          className="absolute inset-0 w-60 object-cover opacity-40"
          alt=""
        />
        <div className="sticky z-10">
          <Header
            title="Transaction Details"
            showBack
            isDarkMode
            onBack={onBack}
            showOptions
          />
        </div>
      </div>

      <div
        ref={targetRef}
        style={{ backgroundColor: "#FFFFFF", color: textMain }}
        className="relative -top-12 rounded-t-[40px] px-8 pt-20 flex flex-col items-center"
      >
        <div className="absolute -top-12 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white overflow-hidden">
          <img
            src={image}
            className={
              name.toLowerCase() === "upwork"
                ? "w-14 h-14 object-contain"
                : "w-full h-full object-cover"
            }
            alt={name}
          />
        </div>

        <span
          style={{ color: themeColor, backgroundColor: badgeBg }}
          className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
        >
          {isIncome ? "Income" : "Expense"}
        </span>

        <h2 className="mt-4 text-3xl font-bold">
          $ {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>

        <div className="w-full mt-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold">Transaction details</h3>
            <ChevronUp size={18} color={mutedText} />
          </div>

          <div className="space-y-5">
            <DetailRow
              label="Status"
              value={isIncome ? "Income" : "Expense"}
              valueColor={themeColor}
            />
            <DetailRow
              label={isIncome ? "From" : "To"}
              value={fromTo || name}
            />
            <DetailRow label="Time" value={time} />
            <DetailRow label="Date" value={date} />
          </div>

          <div
            style={{ backgroundColor: dividerColor }}
            className="my-8 h-px"
          />

          <div className="space-y-5 mb-10">
            <DetailRow
              label={isIncome ? "Earnings" : "Spending"}
              value={`$ ${(amount + fee).toFixed(2)}`}
            />
            <DetailRow label="Fee" value={`- $ ${fee.toFixed(2)}`} />
            <div className="flex justify-between items-center pt-2">
              <span style={{ color: mutedText }} className="font-medium">
                Total
              </span>
              <span className="font-bold text-base">$ {amount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={toPDF}
            style={{
              borderColor: themeColor,
              color: themeColor,
            }}
            className="w-full py-4 rounded-3xl border font-bold text-sm transition-all active:scale-[0.98]"
          >
            Download Receipt
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <ReceiptPDF ref={targetRef} transaction={transaction} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView="wallet" />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, valueColor = "#111827" }) => (
  <div className="flex justify-between items-center text-sm">
    <span style={{ color: "#6B7280" }} className="font-medium">
      {label}
    </span>
    <span style={{ color: valueColor }} className="font-semibold">
      {value}
    </span>
  </div>
);

export default TransactionDetails;
