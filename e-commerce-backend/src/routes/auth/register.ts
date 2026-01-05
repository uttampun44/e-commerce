import { RegisterController } from "@controllers/auth/RegisterController";
import { Router } from "express";

const registerRouter = Router();

registerRouter.post("/register", RegisterController);

export default registerRouter;