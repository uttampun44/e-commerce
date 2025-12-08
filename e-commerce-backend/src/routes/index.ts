import { Router } from "express";
import loginRouter from "@routes/auth/login";
import registerRouter from "@routes/auth/register";

const combineroutes = Router();

combineroutes.use("/auth", loginRouter);
combineroutes.use("/auth", registerRouter);

export default combineroutes;
