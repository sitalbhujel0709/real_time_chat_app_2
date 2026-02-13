import { Request, Response } from "express";
import { ConversationService } from "./conversation.service";

export class conversationController {
  static async createConversation(req:Request,res:Response):Promise<void|Response>{
    const {participants,name} = req.body;
    try {
      const creatorId = (req as any).user.id;
      if (!participants.includes(Number(creatorId))) {
        participants.push(Number(creatorId));
      }
      const conversation = await ConversationService.createConversation({participants,name});
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({message: error instanceof Error ? error.message : 'Internal Server Error'})
    }
  }
  static async getUsersConversations(req:Request,res:Response):Promise<void | Response>{
    const userId = (req as any).user.id;
    try {
      const conversations = await ConversationService.getUserConversations(Number(userId));
      if(conversations.length === 0){
        return res.status(404).json({message:'No Conversations found '})
      }
      res.status(200).json(conversations);
    } catch (error) {
      console.error(error);
      res.status(500).json({message:error instanceof Error ? error.message : 'Internal Server Error'})
    }
  }
}