import { Router } from "express";
import { conversationController } from "./conversation.controller";
import { requireAuth } from "../../middleware/requireAuth";


const conversationRouter:Router = Router();

conversationRouter.post('/',requireAuth,conversationController.createConversation)
conversationRouter.get('/',requireAuth,conversationController.getUsersConversations)

export default conversationRouter;