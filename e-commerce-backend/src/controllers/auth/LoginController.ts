import { UserModel } from "@/schemas/users/user.schema";
import { userTypes } from "@/schemas/users/user.types";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

export const LoginController = async (req: Request, res: Response) => {
  try {

    const validationData = userTypes.parse(req.body);
    // Login logic will be here
    const { email, password } = validationData;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const checkUserEmail = await UserModel.findOne({ email });

    if (!checkUserEmail) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUserEmail.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "An error occurred during login"
    });
  }
}
