import { LogoutController } from "@controllers/auth/LogoutController";
import { Router } from "express";

const logoutRoute = Router();

logoutRoute.post("/logout", LogoutController);

export default logoutRoute;