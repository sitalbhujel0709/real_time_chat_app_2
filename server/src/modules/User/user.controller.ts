import { Request,Response } from "express";
import { UserService } from "./user.service";
import bcrypt from 'bcrypt';

export class UserController {
  static async createUser(req:Request,res:Response):Promise<void | Response>{
    const {name,username,email,password} = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password,15)
      const user = await UserService.createUser({name,username,email,password: hashedPassword})
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async loginUser(req:Request,res:Response):Promise<void|Response>{
    const {email,password} = req.body;
    try {
      const {accessToken,...userWithoutPassword} = await UserService.LoginUser(email,password)
      res.cookie('accessToken',accessToken,{
        httpOnly: true,
        secure:false,
        sameSite:'lax',
        maxAge: 60 * 60 * 1000 // 1 hour
      })
      res.status(200).json({ ...userWithoutPassword, accessToken });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async getAllUsers(_:Request,res:Response):Promise<void|Response>{
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async getUserById(req:Request,res:Response):Promise<void | Response>{
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async getUserProfile(req:Request,res:Response):Promise<void | Response>{
    const userId = (req as any).user.id;
    try {
      const user = await UserService.getUserProfile(Number(userId));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async updateUser(req:Request,res:Response):Promise<void | Response>{
    const id = (req as any).user.id;
    const data = req.body;
    try {
      const user = await UserService.updateUser(Number(id),data);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  }
  static async logoutUser(_:Request,res:Response):Promise<void | Response>{
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'Logged out successfully' });
  }
}