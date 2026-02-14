import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import { ChevronUp, ChevronDown, Copy, Check } from "lucide-react";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";

const PaymentConfirmation = ({ transaction, onBack, navigate }) => {
  // Use the theme colors from your provided code
  const themeColor = "#438883";
  const mutedText = "#6B7280";
  const textMain = "#111827";

  // Fallback data matching the image
  const {
    name = "Youtube Premium",
    amount = 11.99,
    date = "Feb 28, 2022",
    time = "08:15 AM",
    fee = 1.99,
    transactionId = "2092913832472..",
  } = transaction || {};

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      {/* Background Header Section */}
      <div className="relative h-60">
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
        <div className="sticky z-10">
          <Header title="Bill Payment" showBack isDarkMode onBack={onBack} />
        </div>
      </div>

      {/* White Card Content */}
      <div
        className="relative -top-20 rounded-t-[40px] bg-white px-8 pt-20 -mb-36 flex flex-col items-center"
        style={{ color: textMain }}
      >
        {/* Success Icon */}
        <div className="absolute top-4 w-24 h-24  rounded-full flex items-center justify-center  ">
          {" "}
          <div className="w-16 h-16 bg-gray-400/30 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-[#438883] rounded-full flex items-center justify-center text-white">
              <Check size={28} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mt-16 mb-8">
          <h2 className="text-2xl font-bold text-[#438883]">
            Payment Successfully
          </h2>
          <p style={{ color: mutedText }} className="text-sm mt-1">
            {name}
          </p>
        </div>

        {/* Transaction details dropdown section */}
        <div className="w-full">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center mb-6 focus:outline-none"
          >
            <h3 className="text-base font-bold">Transaction details</h3>
            {isExpanded ? (
              <ChevronUp size={18} style={{ color: mutedText }} />
            ) : (
              <ChevronDown size={18} style={{ color: mutedText }} />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-5">
              <DetailRow label="Payment method" value="Debit Card" />
              <DetailRow
                label="Status"
                value="Completed"
                valueColor={themeColor}
              />
              <DetailRow label="Time" value={time} />
              <DetailRow label="Date" value={date} />

              <div className="flex justify-between items-center text-sm">
                <span style={{ color: mutedText }} className="font-medium">
                  Transaction ID
                </span>
                <div className="flex items-center gap-2 font-semibold">
                  <span>{transactionId}</span>
                  <Copy size={16} className="text-[#438883]" />
                </div>
              </div>
            </div>
          )}

          <div className="my-8 h-px bg-gray-100" />

          {/* Pricing Section */}
          <div className="space-y-5 mb-10">
            <DetailRow label="Price" value={`$ ${amount.toFixed(2)}`} />
            <DetailRow label="Fee" value={`- $ ${fee.toFixed(2)}`} />
            <div className="flex justify-between items-center pt-2">
              <span style={{ color: mutedText }} className="font-bold">
                Total
              </span>
              <span className="font-bold text-lg">
                $ {(amount + fee).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Share Receipt Button */}
          <button
            className="w-full py-4 rounded-3xl border font-bold text-base transition-all active:scale-[0.98]"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Share Receipt
          </button>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView="wallet" />
      </div>
    </div>
  );
};

// Helper component for rows
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

export default PaymentConfirmation;
