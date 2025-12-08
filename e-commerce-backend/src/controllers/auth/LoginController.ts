import { Request, Response } from "express";

class LoginController {
  // TODO: implement login logic
  public static async login(req: Request, res: Response) {
    res.send("LoginController login placeholder");
  }
}

export default LoginController;
