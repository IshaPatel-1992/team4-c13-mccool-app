import { Schema } from "mongoose";
import ItestUser from "../interface/ItestUser";

const testUserSchema = new Schema<ItestUser>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
});

export default testUserSchema;