import React from "react";
import { MoveLeft, Search } from "lucide-react";
const NewChatmodal = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-white backdrop-blur-xl flex justify-center items-center z-50">
      <div className="w-full h-full px-4">
        <div className="h-16 flex items-center justify-between">
          <span className="text-lg font-semibold text-emerald-600">
            New Chat
          </span>
          <span
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300 "
          >
            <MoveLeft className="w-5 h-5 text-emerald-600 font-bold" />
          </span>
        </div>

        <div className="w-full h-10 rounded-full bg-gray-200 px-4 flex items-center focus-within:ring-2 ring-emerald-600">
          <span className="cursor-pointer">
            <Search className="w-5 h-5 text-emerald-600" />
          </span>
          <input
            type="text"
            placeholder="Search username"
            className="text-md font-semibold text-emerald-600 border-none outline-none ml-4 placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default NewChatmodal;
