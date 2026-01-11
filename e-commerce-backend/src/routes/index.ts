import { Router } from "express";
import loginRouter from "@routes/auth/login";
import registerRouter from "@routes/auth/register";
import logoutRoute from "./auth/logout";

const combineroutes = Router();

combineroutes.use("/auth", loginRouter);
combineroutes.use("/auth", registerRouter);
combineroutes.use("/auth", logoutRoute);

export default combineroutes;
