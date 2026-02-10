import { User } from "@prisma/client";
import { prisma } from "../../config/prisma";
import bcrypt from 'bcrypt'
import { generateToken } from "../../utils/jwt";

type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
type CreateUserResponse = Omit<User, 'password'>
type LoginUserResponse = CreateUserResponse & { accessToken: string }

export class UserService {
  static async createUser(data: CreateUserDTO): Promise<CreateUserResponse> {
    const userExists = await prisma.user.findFirst({
      where: {
        OR:[
          { email: data.email },
          { username: data.username }
        ]
      }
    })
    if(userExists){
      throw new Error('User with this email or username already exists')
    }
    const user = await prisma.user.create({
      data
    })
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  static async LoginUser(email:string,password:string):Promise<LoginUserResponse>{
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if(!user){
      throw new Error('Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      throw new Error('Invalid credentials')
    }
    const accessToken = generateToken({ id: user.id, username: user.username, email: user.email })
    const {password:_,...userWithoutPassword} = user;
    return { ...userWithoutPassword, accessToken };
  }
  static async getAllUsers():Promise<CreateUserResponse[]>{
    const users = await prisma.user.findMany();
    return users.map(({password,...userWithoutPassword})=>userWithoutPassword);
  }
  static async getUserById(id:number):Promise<CreateUserResponse | null>{
    const user = await prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  static async getUserProfile(id:number):Promise<CreateUserResponse | null>{
    const user = await prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  static async updateUser(id:number,data:Partial<CreateUserDTO>):Promise<CreateUserResponse>{
    if(data.password){
      data.password = await bcrypt.hash(data.password,15)
    }
    const user = await prisma.user.update({
      where: { id },
      data
    })
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}