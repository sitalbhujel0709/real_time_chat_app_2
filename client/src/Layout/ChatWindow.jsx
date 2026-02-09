import React from "react";
import { EllipsisVertical,Plus,ArrowBigRight} from "lucide-react";

const ChatWindow = () => {
  return (
    <div className=" h-full flex flex-col ">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 ">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full mr-3 bg-emerald-50 text-emerald-600 font-semibold cursor-pointer hover:bg-emerald-100">AB</div>
          <h1 className="text-lg font-semibold text-emerald-600">Chat Window</h1>
        </div>
        <div className="flex items-center">
          <span className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300 rounded-full">
            <EllipsisVertical className="w-5 h-5 text-emerald-600 font-bold" />
          </span>
        </div>
      </header>
      {/* Body */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-50 p-4 relative">
        {/* Messages */}
        {/* Input */}
        <div className=" h-12 rounded-full bg-gray-200 px-2 flex items-center gap-1 focus-within:ring-2 ring-emerald-600 absolute left-4 right-4 bottom-4">
          <span className="p-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300 rounded-full">
            <Plus className="w-6 h-6 text-emerald-600" />
          </span>
          <input type="text" className="text-md font-semibold text-emerald-600 flex-1 outline-none" />
          <span className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 cursor-pointer hover:bg-emerald-700">
            <ArrowBigRight className="w-6 h-6 text-gray-300"/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
