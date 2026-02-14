import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import DebitCard from "../components/Cards/DebitCard";
import { Landmark, CircleDollarSign } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";

const BillConfirmation = ({ onBack, bill, paymentMethod }) => {
  const navigate = useNavigate();

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
        logo: "https://www.google.com/s2/favicons?domain=youtube.com&sz=128",
      };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative h-60 ">
        <img
          src={Rectangle9}
          className="absolute inset-0 w-full h-full object-cover z-0 "
          alt="bg"
        />
        <img
          src={Group6}
          className="absolute inset-0 w-52 object-cover z-0"
          alt="decor"
        />
        <div className=" z-40 sticky top-0">
          <Header
            title="Bill Details"
            showBack={true}
            isDarkMode={true}
            onBack={onBack}
            showOptions={true}
          />
        </div>
      </div>

      <div className="bg-white grow rounded-t-[40px] px-8 pt-12 pb-32 relative z-10 -mt-16 -mb-28 flex flex-col shadow-2xl overflow-y-auto ">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden mb-2">
            <img
              src={details.logo}
              className="w-10 h-10 object-contain"
              alt="service"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Payment to be made to{" "}
              <span className="text-[#438883] block sm:inline">
                {details.name}
              </span>
            </h2>
            <p className="text-sm text-gray-400">On {details.date}</p>
          </div>
        </div>

        <div className="space-y-4 mb-24">
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

        <button
          onClick={() => {
            if (paymentMethod === "paypal") {
              window.open(
                "https://www.sandbox.paypal.com/checkoutnow?amount=10&currency=USD",
                "_blank",
              );
            } else {
              navigate("/paymentConfirmation/", {
                state: {
                  bill: details,
                  paymentMethod,
                },
              });
            }
          }}
          className="w-full -mb-20 mt-16 py-5 bg-[#438883] text-white rounded-3xl font-semibold text-base shadow-lg shadow-teal-100 active:scale-95 transition-all"
        >
          Confirm and Pay
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView={"wallet"} />
      </div>
    </div>
  );
};

export default BillConfirmation;
