import { Request, Response } from "express";
import { MessageService } from "./message.service";

export class MessageController {
  static async findAllMessagesInConversation(req:Request,res:Response):Promise<void | Response>{
    const {conversationId} = req.params;
    try {
      const messages = await MessageService.findAllMessagesInConversation(Number(conversationId));
      if(messages.length <= 0 || !messages){
        return res.status(404).json({message:'No messages found in this conversation'})
      }
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({message: error instanceof Error ? error.message : 'Internal Server Error'})
    }
  }
  static async createMessage(req:Request,res:Response):Promise<void|Response>{
    const {content,conversationId} = req.body;
    try {
      const message = await MessageService.createMessage({
        content,
        conversationId,
        senderId: Number((req as any).user.id)
      })
      res.status(201).json(message);
    } catch (error) {
      console.error(error)
      res.status(500).json({message: error instanceof Error ? error.message : 'Internal Server Error'})
    }
  }
}