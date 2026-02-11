import { Router } from "express";
import userRouter from "../modules/User/user.route";
import conversationRouter from "../modules/Conversation/conversation.route";
import messageRouter from "../modules/Message/message.route";
const router:Router = Router()

router.use('/users', userRouter);
router.use('/conversations',conversationRouter)
router.use('/messages',messageRouter)

export default router