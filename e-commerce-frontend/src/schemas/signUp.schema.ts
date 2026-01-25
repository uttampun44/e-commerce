import { z } from 'zod';

export const signUpSchema = z.object({
  fullname: z
    .string("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters"),
  
  email: z
    .string("Email is required")
    .email("Invalid email address"),
  
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  
  confirm_password: z
    .string("Confirm password is required")
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
