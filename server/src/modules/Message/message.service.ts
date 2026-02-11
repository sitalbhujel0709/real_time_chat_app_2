import { prisma } from "../../config/prisma";
import { Message } from "@prisma/client";

type CreateMesageDTO = {
  conversationId: number;
  senderId: number;
  content: string;
}

export class MessageService {
  static async findAllMessagesInConversation(conversationId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where:{
        conversationId
      }
    })
    return messages;
  }
  static async createMessage({conversationId,senderId,content}:CreateMesageDTO):Promise<Message>{
    const message = await prisma.message.create({
      data:{
        conversationId,
        senderId,
        content
      }
    })
    return message;
  }
}
