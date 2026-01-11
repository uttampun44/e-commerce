import { LoginController } from "@controllers/auth/LoginController";
import { Router} from "express";

const loginRouter = Router();

loginRouter.post("/login", LoginController);

export default loginRouter;
