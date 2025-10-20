import express from 'express'
import UserController from '../Controllers/UserController.mjs';

const userRoutes= express.Router();


userRoutes

.get("/",UserController.index)
.post("/SignUp/",UserController.SignUp)
.post("/Login/",UserController.Login)
.delete("/:id",UserController.DeleteUser)

export default userRoutes;