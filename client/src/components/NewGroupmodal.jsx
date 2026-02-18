import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { EllipsisVertical, MoveLeft, Search, UserPlus } from "lucide-react";
import { useAuth } from "../context/authContext";
import api from "../config/axios";

const NewGroupmodal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        const filteredUsers = response.data.filter((u) => u.id !== user.id);
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };
  const handleSetParticipants = (userId)=>{
    if(participants.includes(userId)){
      setParticipants(participants.filter(id=>id !== userId))
    } else {
      setParticipants([...participants, userId])
    }
  }
  const handleCreateGroup = async()=>{
    try {
      console.log(participants, groupName)
      const response = await api.post("/conversations",{participants, name: groupName});
      console.log(response.data)
      const conversationId = response.data.id;
      navigate(`/chat/${conversationId}`)
    } catch (error) {
      console.error("Error creating group conversation:", error);
    }
  }
  return (
    <div className="absolute inset-0 bg-white backdrop-blur-xl flex justify-center items-center z-50">
      <div className="w-full h-full px-4">
        <div className="h-16 flex items-center justify-between ">
          <span className="text-lg font-semibold text-emerald-600">
            New Group
          </span>
          <span
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300"
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
        <div className="w-full h-10 rounded-full bg-gray-200 px-4 flex items-center focus-within:ring-2 ring-emerald-600 mt-4">
          <span className="cursor-pointer">
            <UserPlus className="w-5 h-5 text-emerald-600" />
          </span>
          <input
            type="text"
            value={groupName}
            onChange={handleInputChange}
            placeholder="New Group Name"
            className="text-md font-semibold text-emerald-600 border-none outline-none ml-4 placeholder:text-gray-400"
          />
        </div>
        <div className="mt-4 space-y-0.5 overflow-y-auto flex-1">
          {users.map((user) => (
            <div
              onClick={()=>handleSetParticipants(user.id)}
              key={user.id}
              className={`px-2 py-3 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors duration-300 flex items-center  justify-between ${participants.includes(user.id)? "bg-gray-100":""}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-semibold font-xl flex items-center justify-center cursor-pointer">
                  {user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <span className="text-emerald-600 font-semibold">
                  {user.name}
                </span>
              </div>
              <span className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300">
                <EllipsisVertical className="w-5 h-5 text-emerald-600 font-bold" />
              </span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button onClick={handleCreateGroup} disabled={!groupName.trim() || participants.length < 2} className="w-full py-2 bg-emerald-600 rounded-lg text-gray-100 cursor-pointer hover:bg-emerald-700 transition-colors duration-300 disabled:bg-blue-400">Create Group</button>
        </div>
      </div>
    </div>
  );
};

export default NewGroupmodal;
