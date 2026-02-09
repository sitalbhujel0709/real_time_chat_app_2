import React, { useRef, useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span
      onClick={() => setIsOpen(!isOpen)}
      ref={dropdownRef}
      className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300 relative"
    >
      <EllipsisVertical className="w-5 h-5 text-emerald-600 font-bold" />
      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-60 w-40 overflow-auto rounded-lg bg-white p-1 text-sm shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 text-emerald-600 font-semibold hover:bg-emerald-50"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default Dropdown;
