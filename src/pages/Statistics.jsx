import React, { useState, useMemo } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import TransactionItem from "../components/Cards/TransactionItem";
import { Download, ArrowUpDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePDF } from "react-to-pdf";

import StatisticsPDF from "../components/PDF/StatisticsPDF";
import { useTransactions } from "../components/Cards/AddTransactions";

const Statistics = ({ onBack, navigate }) => {
  const { transactions } = useTransactions();

  const [activeTab, setActiveTab] = useState("Year");
  const [filterType, setFilterType] = useState("expense");

  const { toPDF, targetRef } = usePDF({
    filename: `Statistics-${activeTab}-${filterType}.pdf`,
  });

  const filteredByDate = useMemo(() => {
    if (!transactions.length) return [];

    const latestDate = new Date(
      Math.max(...transactions.map((t) => new Date(t.date))),
    );

    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      const daysDiff = (latestDate - tDate) / (1000 * 60 * 60 * 24);

      if (activeTab === "Day") {
        return tDate.toDateString() === latestDate.toDateString();
      }

      if (activeTab === "Week") {
        return daysDiff >= 0 && daysDiff <= 7;
      }

      return true;
    });
  }, [activeTab]);

  const topSpending = useMemo(() => {
    return filteredByDate
      .filter((t) => t.type === filterType)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [filterType, filteredByDate]);

  const chartData = useMemo(() => {
    const totals = {};
    let labels = [];

    if (activeTab === "Day")
      labels = Array.from({ length: 24 }, (_, i) => i.toString());
    if (activeTab === "Week")
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (activeTab === "Month")
      labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
    if (activeTab === "Year")
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

    labels.forEach((l) => (totals[l] = 0));

    filteredByDate.forEach((t) => {
      if (t.type !== filterType) return;

      let key;
      if (activeTab === "Day") key = new Date(t.date).getHours().toString();
      if (activeTab === "Week")
        key = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          new Date(t.date).getDay()
        ];
      if (activeTab === "Month") key = new Date(t.date).getDate().toString();
      if (activeTab === "Year")
        key = new Date(t.date).toLocaleString("default", { month: "short" });

      if (key in totals) totals[key] += t.amount;
    });

    return labels.map((l) => ({ name: l, value: totals[l] }));
  }, [filteredByDate, filterType, activeTab]);

  const income = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="px-4 sticky">
        <Header
          title="Statistics"
          showBack
          isDarkMode={false}
          onBack={onBack}
          rightIcon={
            <Download size={22} className="cursor-pointer" onClick={toPDF} />
          }
        />
      </div>

      <div className="px-6 mt-4">
        <div className="flex justify-between mb-6">
          {["Day", "Week", "Month", "Year"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl ${
                activeTab === tab
                  ? "bg-[#438883] text-white shadow-md"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-xl py-2 px-2 text-xs font-semibold text-gray-600"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="h-48 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="statGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#438883" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#438883" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#438883"
                strokeWidth={3}
                fill="url(#statGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">
            {filterType === "expense" ? "Top Expenses" : "Top Incomes"}
          </h3>
          <ArrowUpDown
            size={20}
            className={
              filterType === "expense" ? "text-red-500" : "text-green-500"
            }
            onClick={() =>
              setFilterType(filterType === "expense" ? "income" : "expense")
            }
          />
        </div>

        <div className="space-y-2">
          {topSpending.map((item) => (
            <TransactionItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div
        ref={targetRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: 900,
          background: "#fff",
        }}
      >
        <StatisticsPDF
          data={filteredByDate}
          chartData={chartData}
          activeTab={activeTab}
          filterType={filterType}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav navigate={navigate} currentView="statistics" />
      </div>
    </div>
  );
};

export default Statistics;
