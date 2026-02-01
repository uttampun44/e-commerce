import mongoose, { Document } from "mongoose"
import { userTypes } from "../schemas/users/user.types";
import z from "zod";

type UserType = z.infer<typeof userTypes>;

export interface Iuser extends Document, UserType {
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new mongoose.Schema<Iuser>({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
}, { timestamps: true });

export const UserModel = mongoose.model<Iuser>("users", userSchema);