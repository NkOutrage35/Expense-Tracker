import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-linear-to-b from-[#438883] to-[#2F7E79] flex items-center justify-center">
      <h1 className="text-white text-5xl font-bold tracking-tighter animate-pulse">
        mono
      </h1>
    </div>
  );
};

export default SplashScreen;
