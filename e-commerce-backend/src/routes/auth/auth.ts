import { LoginController } from "@controllers/auth/LoginController";
import { LogoutController } from "@controllers/auth/LogoutController";
import { RegisterController } from "@controllers/auth/RegisterController";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post('/register', RegisterController)
AuthRouter.post('/login', LoginController)
AuthRouter.post('/logout', LogoutController);

export default AuthRouter