import { Router } from "express";
import { UserController } from "./user.controller";
import { requireAuth } from "../../middleware/requireAuth";
const userRouter:Router = Router()

userRouter.post('/register',UserController.createUser)
userRouter.post('/login',UserController.loginUser)
userRouter.get('/' ,UserController.getAllUsers)
userRouter.get('/profile',requireAuth,UserController.getUserProfile)
userRouter.get('/:id',requireAuth,UserController.getUserById)
userRouter.put('/update',requireAuth,UserController.updateUser)
userRouter.post('/logout',requireAuth,UserController.logoutUser)

export default userRouter