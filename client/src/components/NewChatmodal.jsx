import React, { useEffect, useState } from "react";
import { EllipsisVertical, MoveLeft, Search } from "lucide-react";
import api from "../config/axios";
const NewChatmodal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
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
        <div className="mt-4 ">
          {users.map((user) => (
            <div
              key={user.id}
              className="px-2 py-3 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors duration-300 flex items-center  justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-semibold font-xl flex items-center justify-center cursor-pointer">
                  {user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <span className="text-emerald-600 font-semibold">
                  {user.username}
                </span>
              </div>
              <span className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300">
                <EllipsisVertical className="w-5 h-5 text-emerald-600 font-bold" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewChatmodal;
