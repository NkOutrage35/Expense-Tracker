import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import { CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BillDetails = ({ bill, onBack }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const location = useLocation();

  const rawBill = location.state?.bill;

  const details = rawBill
    ? {
        name: rawBill.name,
        date: rawBill.date,
        price: Math.abs(rawBill.amount ?? rawBill.price ?? 0),
        fee: 1.99,
        total: Math.abs(rawBill.amount ?? rawBill.price ?? 0) + 1.99,
        logo: rawBill.image ?? rawBill.logo,
      }
    : {
        name: "Youtube Premium",
        date: "Feb 28, 2022",
        price: 11.99,
        fee: 1.99,
        total: 13.98,
        logo: "/images/youtube-logo.png",
      };

  return (
    <div className="bg-[#429690] min-h-screen flex flex-col font-sans relative">
      <div className="relative h-64">
        <img
          src="/images/Rectangle 9.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group 6.png"
          className="absolute inset-0 w-60 object-cover z-0 opacity-40"
          alt="decor"
        />
        <div className=" z-40 sticky top-0">
          <Header
            title="Bill Details"
            showBack={true}
            isDarkMode={true}
            onBack={onBack}
            showOptions={true}
            className={"sticky"}
          />
        </div>
      </div>

      <div className="bg-white grow rounded-t-[40px] px-8 pt-12 pb-32 relative z-10 -mt-16 flex flex-col shadow-2xl overflow-y-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
            <img
              src={details.logo}
              className="w-10 h-10 object-contain"
              alt="service"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{details.name}</h2>
            <p className="text-sm text-gray-400">{details.date}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-base">
            <span className="text-gray-400 font-medium">Price</span>
            <span className="font-bold text-gray-900">
              $ {details.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-base">
            <span className="text-gray-400 font-medium">Fee</span>
            <span className="font-bold text-gray-900">
              $ {details.fee.toFixed(2)}
            </span>
          </div>
          <hr className="border-gray-100 my-2" />
          <div className="flex justify-between items-center text-base">
            <span className="text-gray-400 font-medium">Total</span>
            <span className="font-bold text-gray-900">
              $ {details.total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 font-bold text-base mb-2">
            Select payment method
          </h3>

          <PaymentOption
            label="Debit Card"
            icon={<CreditCard className="text-[#429690]" size={20} />}
            isSelected={paymentMethod === "debit"}
            onSelect={() => setPaymentMethod("debit")}
          />

          <PaymentOption
            label="Paypal"
            icon={
              <img
                src="/images/image 5.png"
                className="w-5 h-5"
                alt="paypal"
              />
            }
            isSelected={paymentMethod === "paypal"}
            onSelect={() => setPaymentMethod("paypal")}
          />
        </div>

        <button
          onClick={() => {
            if (paymentMethod === "paypal") {
              window.open(
                "https://www.sandbox.paypal.com/checkoutnow?amount=10&currency=USD",
                "_blank",
              );
            } else {
              navigate("/connect-wallet", {
                state: {
                  bill: details,
                  paymentMethod,
                },
              });
            }
          }}
          className="w-full  mb-10 mt-4 py-5 bg-[#429690] text-white rounded-3xl font-bold text-base shadow-lg shadow-teal-100 active:scale-95 transition-all"
        >
          Pay Now
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView={"wallet"} />
      </div>
    </div>
  );
};

const PaymentOption = ({ label, icon, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`flex items-center gap-4 p-5 rounded-3xl border transition-all cursor-pointer ${
      isSelected
        ? "bg-[#EEF7F6] border-[#429690]"
        : "bg-gray-50 border-transparent"
    }`}
  >
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <span
      className={`flex-1 font-bold text-sm ${
        isSelected ? "text-[#429690]" : "text-gray-400"
      }`}
    >
      {label}
    </span>
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? "border-[#429690]" : "border-gray-300"
      }`}
    >
      {isSelected && <div className="w-2.5 h-2.5 bg-[#429690] rounded-full" />}
    </div>
  </div>
);

export default BillDetails;
