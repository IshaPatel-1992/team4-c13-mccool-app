import ItestUser from "../interface/ItestUser";
import testUserSchema from "../schemas/testUserSchema";
import { model } from "mongoose";

const testUserModel = model<ItestUser>("users", testUserSchema);

export default testUserModel;