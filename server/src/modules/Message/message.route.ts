import { Router } from "express";
import { MessageController } from "./message.controller";
import { requireAuth } from "../../middleware/requireAuth";

const messageRouter:Router = Router();

messageRouter.get('/:conversationId',requireAuth,MessageController.findAllMessagesInConversation)
messageRouter.post('/',requireAuth,MessageController.createMessage)

export default messageRouter;