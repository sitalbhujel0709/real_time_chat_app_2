import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Leftbar from "./Leftbar";
import { Outlet } from "react-router-dom";
import api from "../config/axios";

const PageLayout = () => {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get("/conversations");
        setConversations(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
        setConversations([]);
      }
    };
    fetchConversations();
  }, []);
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex flex-1">
        {/* Left */}
        <div className="">
          <Leftbar conversations={conversations} />
        </div>
        {/* Right */}
        <div className="flex-1">
          <Outlet context={{ conversations }} />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
