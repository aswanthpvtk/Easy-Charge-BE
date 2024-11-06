import express from 'express';
import { deleteUser, getAlUsers, getBookingsOfUser, login, signup, updateUser } from '../controllers/user-controller';
const userRouter=express.Router();

userRouter.get('/',getAlUsers);
userRouter.post('/signup',signup);
userRouter.put("/:id",updateUser)
userRouter.delete("/:id",deleteUser)
userRouter.post("/login",login)
userRouter.get("/bookings/:id",getBookingsOfUser)




export default userRouter;