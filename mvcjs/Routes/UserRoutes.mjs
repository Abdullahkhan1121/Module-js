import express from 'express'
import userController from '../Controllers/UserController.mjs';

const userRouter= express.Router();

userRouter

// Get
.get("/",userController.index)
.get("/:id",userController.singleUser)

// Post
.post("/add",userController.addUser)

// Delete
.delete("/:id",userController.deleteUser)

// Put
.put("/:id",userController.editUser)

//Patch


export default userRouter;