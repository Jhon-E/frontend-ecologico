"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ type, icon, placeholder, value, setValue }) => {
  return (
    <>
      <label className="input input-bordered input-accent w-full flex items-center gap-2 text-accent">
        <FontAwesomeIcon icon={icon} />
        <input
          type={type}
          className="grow h-10 text-neutral"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </>
  );
};

export default Input;