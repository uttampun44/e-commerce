import Router from "express";

const resgisterRouter = Router();

resgisterRouter.get("/register", (req, res) => {
  res.send("Register route is working! Everything is set up correctly.");
});

export default resgisterRouter;