import { Users, MessageSquare, Settings } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const navItems = [
    {
      id: 1,
      label: "chat",
      icon: MessageSquare,
    },
    {
      id: 2,
      label: "friends",
      icon: Users,
    },
  ];
  const { user } = useAuth();
  return (
    <div className={`w-16 h-screen bg-gray-50 p-4 border-r border-gray-300`}>
      <div className="h-full flex flex-col justify-between items-center">
        <nav className="space-y-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Link
              to={`/${label}`}
              key={id}
              className="flex justify-center items-center p-2 text-emerald-600  hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-300"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </nav>
        <div className="space-y-4">
          <span className="flex justify-center items-center p-2 text-emerald-600 hover:text-emerald-700 hover:-font-semibold transition-colors duration-300 cursor-pointer">
            <Settings className="w-5 h-5" />
          </span>
          <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 cursor-pointer text-2xl capitalize font-semibold">
            {user?.username[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
