import { UserModel } from "@/schemas/users/user.schema";
import { userTypes } from "@/schemas/users/user.types";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const RegisterController = async (req: Request, res: Response) => {
  try {
     
    const validationData = userTypes.parse(req.body);

    console.log("Validation Data:", validationData);
    
    const { fullname, email, password } = validationData;

    // Registration logic will be here
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ fullname, email, password : passwordHash });
    await newUser.save();
     
    if(!newUser) {
      return res.status(500).json({ success: false, message: "Failed to register user" });
    }
   
      return res.status(201).json({ 
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        }
      });

  } catch (error) {
    return error instanceof Error
  }
}