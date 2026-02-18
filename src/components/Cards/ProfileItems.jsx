import React from "react";
import PropTypes from "prop-types";

function ProfileItems({ icon, name, onClick }) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className="flex items-center w-full gap-8 p-4 bg-white hover:shadow-md  transition cursor-pointer"
    >
      <Icon size={30} />
      <p className="text-lg font-semibold">{name}</p>
    </button>
  );
}

ProfileItems.propTypes = {
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  onclick: PropTypes.func,

};

export default ProfileItems;
