import React, { useMemo } from "react";
import { transactions } from "../../components/data/mockData";

const StatisticsPDF = React.forwardRef(
  ({ activeTab = "Year", filterType = "expense" }, ref) => {
    /* ---------------- Date Filtering ---------------- */
    const filteredByDate = useMemo(() => {
      if (!transactions.length) return [];

      const latestDate = new Date(
        Math.max(...transactions.map((t) => new Date(t.date))),
      );

      return transactions.filter((t) => {
        const tDate = new Date(t.date);
        const daysDiff = (latestDate - tDate) / (1000 * 60 * 60 * 24);

        if (activeTab === "Day")
          return tDate.toDateString() === latestDate.toDateString();

        if (activeTab === "Week") return daysDiff >= 0 && daysDiff <= 7;

        return true; // Month & Year
      });
    }, [activeTab]);

    /* ---------------- Totals ---------------- */
    const totals = useMemo(() => {
      return filteredByDate.reduce(
        (acc, t) => {
          if (t.type === "income") acc.income += t.amount;
          if (t.type === "expense") acc.expense += t.amount;
          return acc;
        },
        { income: 0, expense: 0 },
      );
    }, [filteredByDate]);

    /* ---------------- Top Spending ---------------- */
    const topSpending = useMemo(() => {
      return filteredByDate
        .filter((t) => t.type === filterType)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    }, [filteredByDate, filterType]);

    const accent = filterType === "income" ? "#429690" : "#EF4444";

    return (
      <div
        ref={ref}
        style={{
          padding: 48,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#FFFFFF",
          color: "#111827",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, margin: 0 }}>Statistics Report</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>
            Period: {activeTab} • Type:{" "}
            {filterType === "expense" ? "Expenses" : "Income"}
          </p>
        </div>

        {/* Summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 32,
            gap: 16,
          }}
        >
          <SummaryCard
            label="Total Income"
            value={`$${totals.income.toFixed(2)}`}
            color="#429690"
          />
          <SummaryCard
            label="Total Expenses"
            value={`$${totals.expense.toFixed(2)}`}
            color="#EF4444"
          />
        </div>

        {/* Simple Bar Visualization (PDF-safe) */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 14, marginBottom: 12 }}>
            Distribution Overview
          </p>

          {topSpending.map((t) => (
            <div key={t.id} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4,
                }}
              >
                <span>{t.name}</span>
                <strong>${t.amount.toFixed(2)}</strong>
              </div>

              <div
                style={{
                  height: 8,
                  backgroundColor: "#E5E7EB",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(
                      (t.amount / topSpending[0].amount) * 100,
                      100,
                    )}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <table style={{ width: "100%", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#6B7280" }}>
                <th>Name</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {topSpending.map((t) => (
                <tr key={t.id}>
                  <td style={{ padding: "10px 0" }}>{t.name}</td>
                  <td style={{ padding: "10px 0" }}>{t.date}</td>
                  <td
                    style={{
                      padding: "10px 0",
                      textAlign: "right",
                      fontWeight: 700,
                      color: accent,
                    }}
                  >
                    ${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: 40,
            fontSize: 11,
            color: "#6B7280",
            textAlign: "center",
          }}
        >
          Generated by Wallet App • {new Date().toLocaleDateString()}
        </p>
      </div>
    );
  },
);

const SummaryCard = ({ label, value, color }) => (
  <div
    style={{
      flex: 1,
      padding: 20,
      borderRadius: 16,
      border: "1px solid #E5E7EB",
    }}
  >
    <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{label}</p>
    <h2 style={{ fontSize: 22, margin: 0, color }}>{value}</h2>
  </div>
);

export default StatisticsPDF;
