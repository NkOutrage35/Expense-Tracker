import React from "react";
import PropTypes from "prop-types";

function ProfileItems({ icon, name }) {
  const Icon = icon;

  return (
    <div className="flex items-center gap-8 p-4 bg-white hover:shadow-md  transition cursor-pointer">
      <Icon size={30} />
      <p className="text-lg font-semibold">{name}</p>
    </div>
  );
}

ProfileItems.propTypes = {
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProfileItems;
