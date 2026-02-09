import React, { useState } from "react";
import { MessageSquarePlus, Search } from "lucide-react";
import Dropdown from "../components/Dropdown";
import NewChatmodal from "../components/NewChatmodal";

const Leftbar = () => {
  const chatList = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      lastMessagetime: "2:30 PM",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let's catch up later.",
      lastMessagetime: "1:15 PM",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Did you see the news?",
      lastMessagetime: "Yesterday",
    },
    {
      id: 4,
      name: "Bob Brown",
      lastMessage: "Happy Birthday!",
      lastMessagetime: "Yesterday",
    },
  ];
  const [activeChat, setActiveChat] = useState();
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);

  const options = ["New Group Chat", "Settings", "Logout"];
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
              {
                newChatModalOpen && (
                  <NewChatmodal onClose={() => {setNewChatModalOpen(false)
                    console.log("modal closed")
                  }} />
                )
              }
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
        {chatList.map(({ id, name, lastMessage, lastMessagetime }) => {
          return (
            <div
              key={id}
              className={
                "h-16 p-2 flex items-center rounded-xl hover:bg-gray-200 cursor-pointer transition-colors duration-300" +
                (activeChat === id ? " bg-gray-200" : "")
              }
              onClick={() => setActiveChat(id)}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex justify-center items-center font-semibold cursor-pointer">
                {" "}
                {name.split(" ")[0][0]}
                {name.split(" ")[1][0]}{" "}
              </div>
              <div className="flex flex-col">
                <span className="ml-4 text-md font-semibold text-emerald-600 cursor-pointer">
                  {name}
                </span>
                <span className="ml-4 text-sm text-gray-500 ">
                  {lastMessage}
                </span>
              </div>
              <span className="ml-auto text-xs text-gray-500">
                {lastMessagetime}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leftbar;
