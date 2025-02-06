import IUsers from "../interface/IUsers";
import UsersSchema from "../schemas/usersSchema";
import { model } from "mongoose";

const UsersModel = model<IUsers>("users", UsersSchema);

export default UsersModel;