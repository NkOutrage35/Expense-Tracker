import React from "react";

const DebitCard = ({
  name = "IRVAN MOSES",
  expiry = "22/01",
  number = "6219 8610 2888 8075",
}) => {
  return (
    <div className="relative w-84 max-w-sm h-52 bg-linear-to-br from-[#3E9D92] to-[#2B7E72] rounded-3xl p-6 text-white shadow-xl overflow-hidden font-mono">
      {/* BACKGROUND SEMI-CIRCLES */}
      {/* We use border-white/10 to make them subtle and absolute positioning to place them */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/10 rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-white/5 rounded-full"></div>

      {/* TOP ROW: Labels */}
      <div className="flex justify-between items-start relative z-10">
        <div className="leading-tight">
          <p className="text-[10px] uppercase opacity-80">Debit</p>
          <p className="text-[10px] uppercase opacity-80">Card</p>
        </div>
        <p className="font-bold text-sm">Mono</p>
      </div>

      {/* CHIP: Created with a gradient and a subtle border */}
      <div className="mt-4 relative z-10 w-10 h-8 bg-linear-to-tr from-gray-300 to-gray-100 rounded-md border border-gray-400/50 shadow-inner overflow-hidden">
        {/* Simulating chip lines */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20">
          <div className="border-r border-b border-black"></div>
          <div className="border-b border-black"></div>
        </div>
      </div>

      {/* CARD NUMBER */}
      <div className="mt-6 relative z-10 text-lg tracking-[0.2em] font-medium">
        {number}
      </div>

      {/* BOTTOM ROW: Name and Expiry */}
      <div className="mt-auto pt-4 flex justify-between items-end relative z-10">
        <span className="text-xs tracking-wider uppercase">{name}</span>
        <span className="text-xs tracking-wider">{expiry}</span>
      </div>
    </div>
  );
};

export default DebitCard;
