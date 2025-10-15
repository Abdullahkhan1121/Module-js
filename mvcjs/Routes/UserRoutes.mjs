import express from 'express'
import userController from '../Controllers/UserController.mjs';

const userRouter= express.Router();

userRouter

// Get
.get("/",userController.index)

// Post
.post("/signup",userController.Signup)
.post("/login",userController.Login)

// Delete
// .delete("/:id",userController.deleteUser)




export default userRouter;