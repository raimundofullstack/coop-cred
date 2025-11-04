import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRoutes = Router();

userRoutes.post(
  "/register",
  /* #swagger.tags = ['Users']
    #swagger.path = '/users/register'
     #swagger.description = 'Registro de novo usuário' */
  userController.register
);
userRoutes.post(
  "/login",
  /* #swagger.tags = ['Users']
    #swagger.path = '/users/login'
     #swagger.description = 'Realizando Login na conta' */
  userController.login
);
