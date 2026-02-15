import React, { useEffect, useState } from "react";
import { EllipsisVertical, Plus, SendHorizontal } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useSocket } from "../context/socket";
import api from "../config/axios";

const ChatWindow = () => {
  const { conversations } = useOutletContext();
  const { user } = useAuth();
  const { socket } = useSocket();
  const conversationId = useParams().conversationId;
  const conversation = conversations.find(
    (c) => c.id === Number(conversationId),
  );
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isSending,setIsSending] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${conversationId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    if (!socket || !conversationId) {
      return;
    }
    socket.emit("joinConversation", conversationId);
    socket.on("messageReceived",(message)=>{
      setMessages((prev)=> [...prev,message])
    })
    return ()=>{
      socket.off('messageReceived')
    }
  }, [socket, conversationId]);

  const handleSendMessage = async () => {
    try {
      if(messageInput.trim() === "") return ;
      if(isSending) return;
      setIsSending(true)
      const response = await api.post("/messages", {
        conversationId: Number(conversationId),
        senderId: user.id,
        content: messageInput,
      });
      socket.emit("newMessage",response.data)
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false)
    }
  };

  
  return (
    <div className=" h-full flex flex-col ">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 ">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full mr-3 bg-emerald-50 text-emerald-600 font-semibold cursor-pointer hover:bg-emerald-100">
            {conversation?.Participant.find((p) => p.user.id !== user.id)
              ?.user.name.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h1 className="text-lg font-semibold text-emerald-600">
            {conversation?.name
              ? conversation.name
              : conversation?.Participant.find((p) => p.user.id !== user.id)
                  ?.user.name}
          </h1>
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
        <div className="">
          {messages.map(({ id, content, senderId, createdAt }) => {
            const isOwnMessage = senderId === user.id;
            return (
              <div
                key={id}
                className={`
                  ${isOwnMessage ? "flex justify-end" : "flex justify-start"} px-12 mb-1
                `}
              >
                <div className={`inline-flex max-w-lg wrap-break-word px-4 py-2 rounded-lg ${isOwnMessage ? "bg-emerald-50 text-gray-800" : "bg-gray-200 text-gray-800"}`}>
                  <p>{content}</p>
                  <span className="text-gray-400 text-xs mt-auto ml-1">{(new Date(createdAt)).toLocaleTimeString([],{hour: '2-digit',minute:"2-digit",})}</span>
                </div>
                
              </div>
            );
          })}
        </div>
        {/* Input */}
        <form onSubmit={(e)=>{e.preventDefault();!isSending?handleSendMessage():undefined;}} className=" h-12 rounded-full bg-gray-200 px-2 flex items-center gap-1 focus-within:ring-2 ring-emerald-600 absolute left-4 right-4 bottom-4">
          <span className="p-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300 rounded-full">
            <Plus className="w-6 h-6 text-emerald-600" />
          </span>
          <input
            onChange={(e) => setMessageInput(e.target.value)}
            type="text"
            value={messageInput}
            disabled={isSending}
            className="text-md font-semibold text-emerald-600 flex-1 outline-none"
          />
          <button
          type="submit"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 cursor-pointer hover:bg-emerald-700"
          >
            <SendHorizontal className="w-6 h-6 text-gray-300" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
