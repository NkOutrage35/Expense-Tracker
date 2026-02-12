import React from "react";

const ReceiptPDF = React.forwardRef(({ transaction }, ref) => {
  if (!transaction) return null;

  const {
    name,
    type,
    amount,
    date,
    time,
    fromTo,
    fee,
    category,
    image = "/images/user-profile.png",
  } = transaction;

  const isIncome = type === "income";
  const accent = isIncome ? "#438883" : "#EF4444";

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
        <h1 style={{ fontSize: 26, margin: 0 }}>Transaction Receipt</h1>
        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
          Wallet App
        </p>
      </div>

      {/* Logo + Type */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            width: 96,
            height: 96,
            margin: "0 auto 12px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `3px solid ${accent}`,
            backgroundColor: "#FFFFFF",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <span
          style={{
            padding: "0 12px 12px 12px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            borderRadius: 999,
            color: accent,
            border: `1px solid ${accent}`,
          }}
        >
          {isIncome ? "INCOME" : "EXPENSE"}
        </span>
      </div>

      {/* Amount */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
          Total Amount
        </p>
        <h2
          style={{
            fontSize: 32,
            margin: "6px 0 0",
            color: "#111827",
          }}
        >
          ${amount.toFixed(2)}
        </h2>
      </div>

      {/* Details Card */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <table style={{ width: "100%", fontSize: 14 }}>
          <tbody>
            <Row label="Name" value={name} />
            <Row label={isIncome ? "From" : "To"} value={fromTo} />
            <Row label="Category" value={category} />
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
            <Row label="Fee" value={`$${fee.toFixed(2)}`} />
            <Divider />
            <Row label="Total" value={`$${amount.toFixed(2)}`} bold />
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
        Generated automatically • {new Date().toLocaleDateString()}
      </p>
    </div>
  );
});

const Row = ({ label, value, bold }) => (
  <tr>
    <td style={{ padding: "10px 0", color: "#6B7280" }}>{label}</td>
    <td
      style={{
        padding: "10px 0",
        textAlign: "right",
        fontWeight: bold ? 700 : 400,
        color: "#111827",
      }}
    >
      {value}
    </td>
  </tr>
);

const Divider = () => (
  <tr>
    <td colSpan={2}>
      <div
        style={{
          height: 1,
          backgroundColor: "#E5E7EB",
          margin: "12px 0",
        }}
      />
    </td>
  </tr>
);

export default ReceiptPDF;
