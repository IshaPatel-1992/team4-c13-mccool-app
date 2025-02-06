import { Schema } from "mongoose";
import IUsers from "../interface/IUsers";

const usersSchema = new Schema<IUsers>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },  // Only required for manual login
    authProvider: { type: String, enum: ["manual", "google", "github"], default: "manual" }, 
    oauthId: { type: String },  // Stores OAuth provider ID (Google/GitHub)
    role: { type: String, enum: ["user", "admin","coach"], default: "user" }, // Role-based access
}, { timestamps: true });

export default usersSchema;