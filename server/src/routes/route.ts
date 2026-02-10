import { Router } from "express";
import userRouter from "../modules/User/user.route";
const router:Router = Router()

router.use('/users', userRouter);

export default router