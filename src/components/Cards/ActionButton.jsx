const ActionButton = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="
          w-14 h-14 
          rounded-full 
          border-2 border-[#429690] 
          text-[#429690]
          flex items-center justify-center
          active:scale-95
          transition
        "
      >
        <Icon size={22} />
      </button>

      <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default ActionButton;