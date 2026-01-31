import { Router } from "express";
import AuthRouter from "@routes/auth/auth";
import dashboardRouter from "@routes/dashboard/dashboard";

const combineroutes = Router();

combineroutes.use("/auth", AuthRouter);

combineroutes.use("/dashboard", dashboardRouter);

export default combineroutes;
