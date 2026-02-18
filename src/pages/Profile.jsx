import React, { useState } from "react";
import Header from "../components/navigation/Header";
import BottomNav from "../components/navigation/BottomNav";
import ProfileItems from "../components/Cards/ProfileItems";
import {
  UserRound,
  UsersRound,
  Mail,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import Rectangle9 from "/images/Rectangle9.png";
import Group6 from "/images/Group6.png";
import Group21 from "/images/Group21.png";
import { useNavigate } from "react-router-dom";
import diamond from "/images/diamond(dark).png";

const Profile = ({ onBack }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative h-60">
        <img
          src={Rectangle9}
          className="absolute inset-0 w-full object-cover z-0"
        />
        <img src={Group6} className="absolute inset-0 w-52 object-cover z-0" />

        <div className="sticky z-10">
          <Header
            title="Profile"
            showBack={true}
            isDarkMode={true}
            onBack={onBack}
          />
        </div>
      </div>

      <div className="relative z-20 justify-center items-center flex flex-col -mt-12">
        <img src={Group21} />
        <h2 className="font-bold text-xl mt-2">John Doe</h2>
        <p className="text-[#438883]">john.doe@example.com</p>
      </div>

      <div className="space-y-4 p-6 mt-4">
        <div className="border-b border-gray-200 space-y-4 mt-4 flex items-center gap-8 p-4 bg-white hover:shadow-md transition cursor-pointer">
          <img
            src={diamond}
            className="bg-[#e9f3f2] rounded-full p-3 -mb-0.5 -ml-2"
          />
          <h3 className="font-semibold text-xl -ml-3">Invite Friends</h3>
        </div>

        <div className="space-y-4 p-2">
          <ProfileItems
            icon={UserRound}
            name="Account info"
            onClick={() => navigate("/account")}
          />
          <ProfileItems
            icon={UsersRound}
            name="Personal profile"
            onClick={() => navigate("/dataPrivacy")}
          />
          <ProfileItems
            icon={Mail}
            name="Message center"
            onClick={() => navigate("/security")}
          />
          <ProfileItems
            icon={ShieldCheck}
            name="Login and security"
            onClick={() => navigate("/messageCenter")}
          />
          <ProfileItems
            icon={LockKeyhole}
            name="Data and privacy"
            onClick={() => navigate("/personal")}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav currentView={"profile"} />
      </div>
    </div>
  );
};

export default Profile;
