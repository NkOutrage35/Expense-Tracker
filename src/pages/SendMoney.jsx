import { useNavigate } from "react-router-dom";
import { transactions } from "../components/data/mockData";
import { ArrowRight } from "lucide-react";
import Header from "../components/navigation/Header";
import { useState } from "react";

const SendMoney = ({ onBack }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const recentRecipients = Array.from(
    new Map(
      transactions
        .filter((tx) => tx.status === "Completed")
        .filter((tx) =>
          tx.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((tx) => [tx.name, tx]),
    ).values(),
  ).slice(0, 5);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative h-60">
        <img
          src="/images/Rectangle 9.png"
          className="absolute inset-0 w-full object-cover z-0"
          alt="bg"
        />
        <img
          src="/images/Group 6.png"
          className="absolute inset-0 w-60 object-cover z-0"
          alt="decor"
        />
        <div className="sticky z-10">
          <Header title="Send" showBack isDarkMode onBack={onBack} />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white grow rounded-t-[40px] px-6 pt-8 relative -top-20 pb-32">
        {/* Input */}
        <div className="mb-6">
          <input
            placeholder="Phone, Wallet ID or Name"
            className="w-full border border-gray-200 rounded-xl p-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#429690]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Recent */}
        <h3 className="text-xs font-semibold text-gray-400 mb-4 uppercase">
          Recent
        </h3>

        <div className="space-y-3">
          {recentRecipients.map((r) => (
            <button
              key={r.id}
              className="w-full flex items-center justify-between p-4
                         border border-gray-100 rounded-xl hover:bg-gray-50
                         transition"
              onClick={() => navigate(`/bill/${r.id}`)}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="bg-gray-100 rounded-2xl w-12 h-12 text-white
                                flex items-center justify-center font-semibold"
                >
                  <img src={r.image} alt="" className="object-cover" />
                </div>

                <span className="text-sm font-medium text-gray-800">
                  {r.name}
                </span>
              </div>

              <ArrowRight className="text-gray-400" size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
