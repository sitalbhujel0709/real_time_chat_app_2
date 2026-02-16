import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/authContext";
import { CircleUserRound, LogOut, Pen } from "lucide-react";

const Profilepage = () => {
  const { user,logout } = useAuth();
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex">
        <div className="h-screen flex flex-col border-r border-gray-300 w-md px-4 relative">
          {/* header */}
          <header className="text-2xl font-semibold text-emerald-600 h-16 flex items-center">
            Profile
          </header>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-32 w-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-6xl capitalize font-semibold">
                {user?.username[0]}
              </div>
            </div>
            <div className="px-2 space-y-2 mt-12">
              <div className="text-sm font-semibold text-gray-600">
                Username
              </div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-emerald-600">
                  {user?.username}
                </div>
                <span className="w-10 h-10 flex items-center justify-center hover:bg-emerald-100">
                  <Pen className="w-5 h-5 text-emerald-600"/>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <button onClick={logout} className="px-4 py-2 rounded-md bg-emerald-600 text-gray-50 font-semibold flex items-center gap-2 hover:bg-emerald-700 cursor-pointer">
              <p>Logout</p>
              <LogOut/>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-6">
              <span className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                <CircleUserRound className="w-16 h-16 text-gray-400"/>
              </span>
              <span className="text-3xl font-semibold text-emerald-600">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
