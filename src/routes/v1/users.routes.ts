import { Router } from "express";
const userRoutes = Router();

import userController from "../../controllers/user.controller";


userRoutes.post("/add", (req, res, next)=> userController.addUser(req, res, next));
userRoutes.get("/", (req, res, next)=> userController.listUsers(req, res, next));

export default userRoutes;
