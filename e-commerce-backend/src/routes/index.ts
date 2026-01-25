import { Router } from "express";
import AuthRouter from "@routes/auth/auth";

const combineroutes = Router();

combineroutes.use("/auth", AuthRouter);

export default combineroutes;
