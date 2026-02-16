import app from "../app";
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/prisma";

export const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
  },
  transports:['websocket','polling'],
  allowEIO3:true
})

io.use((socket,next)=>{
  const cookies = socket.request.headers.cookie;
  let token:string | undefined;
  if(cookies){
    const tokenMatch = cookies.match(/accessToken=([^;]+)/);
    token = tokenMatch ? tokenMatch[1]: undefined;
  }

  if(!token && (socket.handshake.query as any).token){
    token = (socket.handshake.query as any).token;
  }
  if(!token){
    next(new Error('Authentication error: No token provided'));
  }

  try {
    const payload = verifyToken(token!)
    socket.data.user = payload.id
    console.log(`User ${payload.username} connected with socket ID: ${socket.id}`);
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
})
const connectedUsers : Record<string,string> = {};

io.on('connection',(socket)=>{
  const userId = socket.data.user;
  console.log(`New client connected: ${socket.id}, user ID: ${userId}`);
  connectedUsers[userId] = socket.id;

  //join conversation room
  socket.on('joinConversation',(conversationId:string)=>{
    socket.join(`conversation_${conversationId}`);
    console.log(`user ${userId} joined conversation room: conversation_${conversationId}`)
  })
  socket.on('newMessage',(message)=>{
    const conversationRoom = `conversation_${String(message.conversationId)}`;
    io.to(conversationRoom).emit('messageReceived',message)
  })
  socket.on('messageSeen',async (data:{conversationId:number,userId:number})=>{
    const {conversationId,userId} = data;
    const conversationRoom = `conversation_${conversationId}`;

    await prisma.message.updateMany({
      where:{
        conversationId:Number(conversationId),
        senderId:{
          not:userId
        }
      },
      data:{
        seen:true
      }
    })
    console.log(`user has seen message`)

    io.to(conversationRoom).emit('markAsSeen',{conversationId,userId})
  })
  io.emit('connectedUsers',Object.keys(connectedUsers))
  socket.on('disconnect',()=>{
    console.log(`Client disconnected: ${socket.id}, user ID: ${socket.data.user}`)
    delete connectedUsers[userId];
    io.emit('connectedUsers',Object.keys(connectedUsers))
  })
})