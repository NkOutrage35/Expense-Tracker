import React from "react";
import { ChevronLeft, MoreHorizontal, Bell } from "lucide-react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";

const Header = ({
  title,
  showBack = false,
  isDarkMode = false,
  guest = "Guest",
  onBack,
  rightIcon,
  onRightAction = () => {},
}) => {
  return (
    <header
      className={`flex justify-between items-center px-6 py-6 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {/* Left Section */}
      {showBack ? (
        <Link
        to="/home"
          
          className="w-10 h-10 flex items-center justify-start transition-active active:scale-90"
        >
          <ChevronLeft size={24} />
        </Link>
      ) : (
        <div className="flex flex-col">
          <span className="text-sm opacity-75">Good afternoon,</span>
          <span className="text-lg font-bold">{guest}</span>
        </div>
      )}

      {/* Center Section: Title */}
      {title && (
        <h1 className="text-lg font-bold absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      {/* Right Section */}
      <button
        onClick={onRightAction}
        className={`${
          isDarkMode ? "bg-white/20" : "bg-gray-100"
        } w-10 h-10 flex items-center justify-center rounded-xl transition-all active:bg-[#438883] active:text-white`}
      >
        {rightIcon ? (
          rightIcon
        ) : showBack ? (
          <MoreHorizontal size={20} />
        ) : (
          <Bell size={20} />
        )}
      </button>
    </header>
  );
};

export default Header;
