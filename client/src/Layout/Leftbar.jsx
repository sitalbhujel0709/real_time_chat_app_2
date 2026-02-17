import React, { useEffect, useState } from "react";
import { MessageSquarePlus, Search } from "lucide-react";
import Dropdown from "../components/Dropdown";
import NewChatmodal from "../components/NewChatmodal";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/socket";

const Leftbar = ({ conversations }) => {
  const [activeChat, setActiveChat] = useState();
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user,logout } = useAuth();
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();

  const options = [
    {label:'New Groupchat',func:()=>{}},
    {label:'Settings',func:()=>{}},
    {label:'Logout',func:logout}
  ];
  useEffect(() => {
    if (!socket) return;
    socket.on("connectedUsers", (users) => {
      console.log("Online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("connectedUsers");
    };
  }, [socket, isConnected]);
  function OpenConversation(id) {
    setActiveChat(id);
    navigate(`/chat/${id}`);
  }
  return (
    <div className="h-screen flex flex-col border-r border-gray-300 w-md px-4 relative">
      {/* Header */}
      <div>
        <header className="h-16 flex items-center justify-between">
          <h1 className="text-emerald-600 text-2xl font-semibold cursor-pointer">
            ChatApp
          </h1>
          <div className="flex gap-4">
            <span
              className="p-2 cursor-pointer hover:bg-emerald-100 transition-colors duration-300 "
              onClick={() => setNewChatModalOpen(true)}
            >
              <MessageSquarePlus className="w-5 h-5 text-emerald-600 font-extrabold" />
            </span>
            {newChatModalOpen && (
              <NewChatmodal
                onClose={() => {
                  setNewChatModalOpen(false);
                }}
              />
            )}
            <Dropdown options={options} />
          </div>
        </header>

        {/* search */}
        <div className="w-full h-10 rounded-full bg-gray-200 px-4 flex items-center focus-within:ring-2 ring-emerald-600">
          <span className="cursor-pointer">
            <Search className="w-5 h-5 text-emerald-600" />
          </span>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="text-md font-semibold text-emerald-600 border-none outline-none ml-4 placeholder:text-gray-400"
          />
        </div>
      </div>
      {/* chat list */}
      <div className="space-y-1 mt-4 overflow-y-auto flex-1">
        {conversations.map(
          ({ id, name, messages, Participant }) => {
            return (
              <div
                key={id}
                className={
                  "h-16 p-2 flex items-end-safe rounded-xl hover:bg-gray-200 cursor-pointer transition-colors duration-300" +
                  (activeChat === id ? " bg-gray-200" : "")
                }
                onClick={() => OpenConversation(id)}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex justify-center items-center font-semibold relative cursor-pointer">
                  {Participant.find((p) => p.user.id !== user.id)
                    ?.user.name.split(" ")
                    .map((n) => n[0])
                    .join("")}
                  <span
                    className={`ml-auto absolute ${onlineUsers.includes(String(Participant.find((p) => p.user.id !== user.id)?.user.id)) ? "bg-green-500" : "bg-gray-400"} w-3 h-3 rounded-full self-start border border-gray-300 bottom-0 right-0`}
                  ></span>
                </div>
                <div className="flex flex-col">
                  <span className="ml-4 text-md font-semibold text-emerald-600 cursor-pointer">
                    {name
                      ? name
                      : Participant.find((p) => p.user.id !== user.id)?.user
                          .name}
                  </span>
                  <span className={`ml-4 text-sm text-gray-500 ${(messages[0]?.senderId !== user.id && !messages[0]?.seen)? "font-semibold text-sky-400":"font-normal"}`}>
                    {messages[0]?.content}
                  </span>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(messages[0]?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Leftbar;
