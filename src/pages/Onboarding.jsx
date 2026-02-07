import React from "react";
import { Link } from "react-router-dom";

const Onboarding = ({ onFinish }) => {
  return (
    <div className="bg-white h-screen w-full flex flex-col items-center">
      <div className="relative h-full w-full rounded-b-3xl  flex-col items-center justify-center overflow-hidden">
        <img src="/images/Group 2.png" className="h-[95%]" />
        <img src="/images/Coint.png" className="absolute top-36 left-14" />
        <img src="/images/Donut.png" className="absolute top-50 right-12" />
        <img
          src="/images/Man.png"
          alt="Onboarding Character"
          className="w-[70%] h-auto object-contain z-10 absolute left-16 top-32"
        />
      </div>

      <div className="grow flex flex-col items-center justify-center px-10 text-center">
        <h2 className="text-[#429690] text-4xl font-bold leading-tight mb-4">
          Spend Smarter <br /> Save More
        </h2>
        <Link
          to="/home"
          className="w-full max-w-lg bg-linear-to-r from-[#429690] to-[#2F7E79] text-white text-[1.05rem] py-5 px-24 rounded-full shadow-neutral-500 shadow-[0px_17px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-125 transition-transform"
        >
          Get Started
        </Link>
        <p className="mt-8 mb-10 text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-[#429690] font-bold">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
