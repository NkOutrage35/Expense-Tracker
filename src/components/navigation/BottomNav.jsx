import React from "react";
import { Home, BarChart2, Wallet, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BottomNav = ({ currentView }) => {
  const navigate = useNavigate();

  const tabs = [
    { key: "home", label: "Home", icon: Home, path: "/home" },
    { key: "statistics", label: "Stats", icon: BarChart2, path: "/statistics" },
    { key: "wallet", label: "Wallet", icon: Wallet, path: "/wallet" },
    { key: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex justify-between items-center">
        {tabs.map(({ key, label, icon: Icon, path }) => {
          const isActive = currentView === key;

          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1"
            >
              <Icon
                size={22}
                className={isActive ? "text-[#438883]" : "text-gray-400"}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-[#438883]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
