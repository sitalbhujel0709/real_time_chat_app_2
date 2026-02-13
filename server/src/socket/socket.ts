import app from "../app";
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import { verifyToken } from "../utils/jwt";

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


io.on('connection',(socket)=>{
  console.log(`New client connected: ${socket.id}, user ID: ${socket.data.user}`);

  socket.on('disconnect',()=>{
    console.log(`Client disconnected: ${socket.id}, user ID: ${socket.data.user}`)
  })
})