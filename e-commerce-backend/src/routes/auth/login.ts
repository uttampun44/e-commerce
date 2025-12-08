import { Router, Request, Response } from "express";

const loginRouter = Router();

loginRouter.get("/login", (req: Request, res: Response) => {
  res.send("Login route is working! Everything is set up correctly.");
});

export default loginRouter;
