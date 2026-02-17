import { Conversation } from "@prisma/client";
import { prisma } from "../../config/prisma";

type CreateConversationDTO = {
  participants: number[];
  name?: string;
}



export class ConversationService {
  static async createConversation({ participants, name }: CreateConversationDTO): Promise<Conversation> {
    const ExistingConversation = await prisma.conversation.findFirst({
      where: {
        Participant: {
          every: {
            userId: {
              in: participants
            }
          }
        }
      }
    })
    if (ExistingConversation) {
      return ExistingConversation
    }
    let isGroup = false;
    if (participants.length > 2) {
      isGroup = true;
    }
    const newConversation = await prisma.conversation.create({
      data: {
        name: name,
        isGroup: isGroup,
        Participant: {
          create: participants.map((userId: number) => {
            return {
              userId: userId
            }
          })
        }
      }
    })
    return newConversation;
  }
  static async getUserConversations(userId: number): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
      where: {
        Participant: {
          some: {
            userId: userId
          },
        }
      },
      
      include:{
        Participant:{
          include:{
            user:true
          }
        },
        messages:{
          orderBy:{
            createdAt:'desc'
          },
          take:1
        }
      }
    })
    return conversations.sort((a, b) => {
    const aTime = a.messages[0]?.createdAt?.getTime() ?? 0;
    const bTime = b.messages[0]?.createdAt?.getTime() ?? 0;
    return bTime - aTime;
  });
  }
}