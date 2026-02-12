import React from "react";
import { Link } from "react-router-dom";
import groupImg from "/images/Group2.png";
import coinImg from "/images/Coin.png";
import donutImg from "/images/Donut.png";
import manImg from "/images/Man.png";

const Onboarding = ({ onFinish }) => {
  return (
    <div className="bg-white h-screen w-full flex flex-col items-center">
      <div className="relative h-full w-full rounded-b-3xl  flex-col items-center justify-center overflow-hidden">
        <img src={groupImg} className=" absolute w-full h-[95%]" />
        <img src={coinImg} className="absolute top-17 left-12" />
        <img src={donutImg} className="absolute top-28 right-16 z-20" />
        <img
          src={manImg}
          alt="Onboarding Character"
          className="w-[60%] h-auto object-contain z-10 absolute left-16 top-18"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center px-10 text-center">
        <h2 className="text-[#4d8d89] text-3xl font-bold leading-tight mb-2 line-height">
          Spend Smarter <br /> Save More
        </h2>
        <Link
          to="/home"
          className="w-full max-w-lg bg-linear-to-r from-[#438883] to-[#2F7E79] text-white text-[1.05rem] py-4 px-28 rounded-full shadow-neutral-500 shadow-[0px_17px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform"
        >
          Get Started
        </Link>
        <p className="mt-2 mb-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-[#438883] font-bold">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
