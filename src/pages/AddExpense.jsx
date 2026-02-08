import React, { useState } from "react";
import Header from "../components/navigation/Header";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useTransactions } from "../components/Cards/AddTransactions";
import { useNavigate } from "react-router-dom";

const AddExpense = ({ onBack, onAdd }) => {
  const [type, setType] = useState("expense"); // expense | income
  const [name, setName] = useState("");
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [invoice, setInvoice] = useState(null);
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const isExpense = type === "expense";

  const [category, setCategory] = useState("");
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Subscription",
    "Entertainment",
    "Salary",
    "Bonus",
  ];

  const submit = () => {
    const newTranaction = {
      id: Date.now(),
      name: name || category,
      category,
      amount: Number(amount),
      type,
      date: date || new Date().toISOString(),
      image: invoice,
    };

    addTransaction(newTranaction);

    navigate("/home");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky h-60">
        <img
          src="/images/Rectangle9.png"
          className="absolute inset-0 w-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group6.png"
          className="absolute inset-0 w-60 object-cover z-0"
          alt="decor"
        />
        <div className="sticky z-10">
          <Header
            title={`Add ${isExpense ? "Expense" : "Income"}`}
            showBack
            isDarkMode
            onBack={onBack}
          />{" "}
        </div>
      </div>

      {/* CARD */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-6">
        {/* TYPE TOGGLE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            TRANSACTION TYPE
          </label>

          <div className="flex bg-gray-100 rounded-4xl p-1 shadow-inner">
            <button
              onClick={() => setType("expense")}
              className={`flex-1 py-2 rounded-4xl font-semibold transition ${
                isExpense
                  ? "bg-red-500 text-white shadow-md scale-[1.02]"
                  : "text-gray-500"
              }`}
            >
              Expense
            </button>

            <button
              onClick={() => setType("income")}
              className={`flex-1 py-2 rounded-4xl font-semibold transition ${
                !isExpense
                  ? "bg-green-500 text-white shadow-md scale-[1.02]"
                  : "text-gray-500"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="relative space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            CATEGORY
          </label>

          <button
            onClick={() => {
              setShowNameDropdown(!showNameDropdown);
            }}
            className="w-full flex justify-between items-center border rounded-lg px-4 py-3"
          >
            <span className="font-medium text-gray-700">
              {category || "Select category"}
            </span>
            <ChevronDown
              className={`transition ${showNameDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showNameDropdown && (
            <div className="absolute z-20 w-full bg-white rounded-lg shadow-xl border">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setShowNameDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">NAME</label>
          <input
            type="text"
            placeholder="Enter merchant / source name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 rounded-lg border text-lg outline-none transition`}
          />
        </div>

        {/* AMOUNT */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">AMOUNT</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-3 rounded-lg border text-lg outline-none transition ${
              isExpense ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          />
        </div>

        {/* DATE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">DATE</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg border outline-none"
          />
        </div>

        {/* INVOICE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">INVOICE</label>

          <label className="flex items-center justify-center gap-3 border border-dashed rounded-lg py-4 cursor-pointer">
            <PlusCircle className="text-gray-500" />
            <span className="text-gray-600 font-medium">Add Invoice</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setInvoice(e.target.files[0])}
            />
          </label>
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          className={`w-full py-4 rounded-4xl text-lg font-semibold shadow-lg transition active:scale-95 text-white ${
            isExpense
              ? "bg-linear-to-r from-red-500 to-red-600"
              : "bg-linear-to-r from-green-500 to-green-600"
          }`}
        >
          Add {isExpense ? "Expense" : "Income"}
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
