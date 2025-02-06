import { Document } from "mongoose";

export default interface IUsers extends Document {
    name: string;
    email: string;
    password?: string; // Optional for OAuth users
    authProvider: "manual" | "google" | "github";
    oauthId?: string | null; // OAuth ID for providers like Google or GitHub
    role: "user" | "admin" | "coach"; // Role-based access control
    createdAt?: Date;
    updatedAt?: Date;
    
    validatePassword?(password: string): Promise<boolean>; // Function to validate password
}
