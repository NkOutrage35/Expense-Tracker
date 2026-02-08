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

const Profile = ({ onBack, navigate }) => {
  return (
    <div>
      <div className="relative h-60">
        <img
          src="/images/Rectangle9.png"
          className="absolute inset-0 w-full object-cover z-0"
        />
        <img
          src="/images/Group6.png"
          className="absolute inset-0 w-60 object-cover z-0"
        />

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
        <img src="/images/Group21.png" alt="" />
        <h2 className="font-bold text-xl mt-2">John Doe</h2>
        <p className="text-[#429690]">john.doe@example.com</p>
      </div>

      <div className="space-y-4 p-6 mt-4">
        <div className="border-b border-gray-200 space-y-4 mt-4 flex items-center gap-8 p-4 bg-white hover:shadow-md transition cursor-pointer">
          <img
            src="/images/diamond(dark).png"
            className="bg-[#e9f3f2] rounded-full p-3 -mb-0.5 -ml-2"
          />
          <h3 className="font-semibold text-xl -ml-3">Invite Friends</h3>
        </div>

        <div className="space-y-4 p-2">
          <ProfileItems icon={UserRound} name="Account info" />
          <ProfileItems icon={UsersRound} name="Personal profile" />
          <ProfileItems icon={Mail} name="Message center" />
          <ProfileItems icon={ShieldCheck} name="Login and security" />
          <ProfileItems icon={LockKeyhole} name="Data and privacy" />
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
