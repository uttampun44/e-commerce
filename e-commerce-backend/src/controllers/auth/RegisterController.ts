import { UserModel } from "@/schemas/users/user.schema";
import { userTypes } from "@/schemas/users/user.types";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

export const RegisterController = async (req: Request, res: Response) => {
  try {
      
    const validationData = userTypes.parse(req.body);
    
    const { fullname, email, password } = validationData;

    // Registration logic will be here
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
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
        users: {
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        }
      });

  } catch (error) {

   // Handle Zod validation errors
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.message
      });
    }

    if (error instanceof Error && error.name === 'MongoError') {
      return res.status(500).json({
        success: false,
        message: "Database error occurred"
      });
    }

    // Handle all other errors
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });

  }
}