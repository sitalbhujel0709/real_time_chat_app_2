import 'dotenv/config'
import jwt from 'jsonwebtoken'

type Payload = {
  id: number,
  username: string,
  email: string
}

export const generateToken = (payload:Payload):string=>{
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
}

export const verifyToken = (token:string):Payload=>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}