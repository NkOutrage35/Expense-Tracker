import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../navigation/Header";
import BottomNav from "../navigation/BottomNav";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";
import Group21 from "/images/Group21.png";
import { User, UserCheck, CalendarDays } from "lucide-react";

const AccountInfo = ({ onBack }) => {
  const navigate = useNavigate();

  const infoItems = [
    { icon: User, label: "User ID", value: "12345678" },
    {
      icon: UserCheck,
      label: "Account Status",
      value: "Verified",
      color: "green",
    },
    { icon: CalendarDays, label: "Registration Date", value: "Jan 12, 2024" },
  ];
  return (
    <div>
      <div className="relative h-60">
        <img
          src={Rectangle9}
          className="absolute inset-0 w-full object-cover z-0"
        />
        <img src={Group6} className="absolute inset-0 w-52 object-cover z-0" />

        <div className="sticky z-0">
          <Header
            title="Profile"
            showBack={true}
            isDarkMode={true}
            onBack={onBack}
          />
        </div>
      </div>

      <div className="space-y-5">
        <h2 className=" font-semibold text-2xl text-white text-center relative bottom-12">
          Account Info
        </h2>
        {infoItems.map((items, index) => {
          const Icons = items.icon;
          return (
            <div
              key={index}
              className=" w-[90%] flex ml-4 justify-center hover:border-teal-400 hover:border bg-gray-50 text-gray-800 p-4 rounded-3xl font-semibold hover:bg-teal-50 transition group gap-4"
            >
              <div className="p-4 bg-gray-200 rounded-2xl group-hover:bg-teal-100 transition">
                <Icons size={24} className="text-[#438883]" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-xs text-gray-800 font-medium uppercase tracking-wider">
                  {items.label}
                </p>
                <p className="text-gray-600 text-base hover:text-teal-600">
                  {items.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav currentView={"profile"} />
      </div>
    </div>
  );
};

export default AccountInfo;
