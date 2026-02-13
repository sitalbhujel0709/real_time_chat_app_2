import { createContext,useContext, useEffect, useState } from "react";
import {io} from 'socket.io-client'
import { useAuth } from "./authContext";

const SocketContext = createContext();

export const SocketProvider = ({children})=>{
  const {user,loading} = useAuth();
  const [socket,setSocket] = useState(null);
  const [isConnected,setIsConnected] = useState(false)
  
  useEffect(()=>{
    if(!loading && user){
      const newSocket = io('http://localhost:5000',{
        withCredentials:true,
        transports:['websocket','polling'],
        reconnection:true,
        reconnectionAttempts:5,
        reconnectionDelay:1000
      })
      newSocket.on('connect',()=>{
        console.log('Socket connected:',newSocket.id);
        setIsConnected(true)
      })
      newSocket.on('connect_error',(error)=>{
        console.error('connect_error:',error)
      })
      newSocket.on('disconnect',()=>{
        console.log('Socket disconnected');
        setIsConnected(false);
      })
      setSocket(newSocket);
      return ()=>{
        console.log('Cleaning up socket connection')
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false)
      }
    }
    else {
      if(socket){
        console.log('Disconnecting socket due to user logout');
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  },[user])

  return (
    <SocketContext.Provider value={{socket,isConnected}}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = ()=> useContext(SocketContext)