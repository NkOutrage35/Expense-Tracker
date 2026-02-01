import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import DebitCard from "../components/Cards/DebitCard";
import { Landmark, CircleDollarSign } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import BillConfirmation from "../pages/BillConfirmation";

// IMPORT MOCK DATA
import { userProfile } from "../components/data/mockData";

const ConnectWallet = ({ onBack, bill, paymentMethod }) => {
  const [activeTab, setActiveTab] = useState("cards");
  const navigate = useNavigate();

  // Card data seeded from mock user
  const [cardData, setCardData] = useState({
    name: userProfile.name.toUpperCase(),
    number: "XXXX XXXX XXXX XXXX",
    expiry: "MM/YY",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const savedAccounts = [
    {
      id: "saved_1",
      bankName: "Chase Bank",
      lastFour: "4421",
      type: "Checking",
    },
    { id: "saved_2", bankName: "Ecobank", lastFour: "8898", type: "Savings" },
  ];
  const [selectedAccount, setSelectedAccount] = useState(savedAccounts[0].id);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative h-60">
        <img
          src="/images/Rectangle 9.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group 6.png"
          className="absolute inset-0 w-60 object-cover z-0"
          alt="decor"
        />
        <div className="relative z-10">
          <Header title="Connect Wallet" showBack isDarkMode onBack={onBack} />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white relative -mt-10 rounded-t-[40px] p-6 text-gray-800 min-h-[60vh]">
        {/* Tabs */}
        <div className="bg-gray-100 p-1 rounded-full flex mb-8">
          {["cards", "accounts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {tab === "cards" ? "Cards" : "Accounts"}
            </button>
          ))}
        </div>

        {/* Cards Tab */}
        {activeTab === "cards" ? (
          <div className="space-y-6">
            <div className="flex justify-center mb-4 transform scale-105">
              <DebitCard
                name={cardData.name}
                number={cardData.number}
                expiry={cardData.expiry}
              />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Add your debit card</h2>
              <p className="text-xs text-gray-400">
                This card must belong to {userProfile.name}
              </p>
            </div>

            <div className="space-y-4">
              <input
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                placeholder="NAME ON CARD"
                className="w-full border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-teal-500"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="number"
                  onChange={handleInputChange}
                  placeholder="CARD NUMBER"
                  className="border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-teal-500"
                />
                <input
                  placeholder="CVC"
                  className="border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-teal-500"
                />
                <input
                  name="expiry"
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-teal-500"
                />
                <input
                  placeholder="ZIP"
                  className="border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Accounts Tab */
          <div className="space-y-6 px-2">
            {/* Saved account */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Saved Accounts
              </h4>
              <div className="space-y-3">
                {savedAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedAccount === acc.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-100 bg-white"
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Landmark size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{acc.bankName}</p>
                        <p className="text-xs text-gray-500">
                          {acc.type} •••• {acc.lastFour}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedAccount === acc.id
                          ? "bg-teal-500 border-teal-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAccount === acc.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Link */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">
                Saved Accounts
              </h4>
              {[
                {
                  id: "bank",
                  title: "Bank Link",
                  desc: "Connect your bank account",
                  icon: Landmark,
                  tag: "Fastest",
                },
                {
                  id: "micro",
                  title: "Microdeposits",
                  desc: "Connect bank in 5-7 days",
                  icon: CircleDollarSign,
                  tag: "Manual",
                },
                {
                  id: "paypal",
                  title: "Paypal",
                  desc: "Connect your Paypal account",
                  icon: faPaypal,
                  isBrand: true,
                },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedAccount(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-3xl border cursor-pointer transition ${
                    selectedAccount === method.id
                      ? "bg-teal-50 border-teal-400"
                      : "bg-gray-50 border-transparent"
                  }`}
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {method.isBrand ? (
                      <FontAwesomeIcon
                        icon={method.icon}
                        size="2xl"
                        className={
                          selectedAccount === method.id
                            ? "text-teal-600"
                            : "text-gray-400"
                        }
                      />
                    ) : (
                      <method.icon
                        size={30}
                        className={
                          selectedAccount === method.id
                            ? "text-teal-600"
                            : "text-gray-400"
                        }
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{method.title}</h3>
                      {method.tag && (
                        <span className="text-sm bg bg-teal-100 text-teal-700 px-2 py-.5 rounded-full font-bold">
                          {method.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{method.desc}</p>
                  </div>

                  {selectedAccount === method.id && (
                    <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (paymentMethod === "paypal") {
                  window.open(
                    "https://www.sandbox.paypal.com/checkoutnow?amount=10&currency=USD",
                    "_blank",
                  );
                } else {
                  navigate("/BillConfirmation", {
                    bill,
                    paymentMethod,
                    selectedAccount,
                  });
                }
              }}
              className="w-full mt-6 border border-teal-600 text-teal-600 py-4 rounded-3xl font-bold hover:bg-teal-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <BottomNav navigate={navigate} currentView="wallet" />
    </div>
  );
};

export default ConnectWallet;
