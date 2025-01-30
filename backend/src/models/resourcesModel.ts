import Iresources from "../interface/Iresources";
import resourcesSchema from "../schemas/resourcesSchema";
import { model } from "mongoose";

const resourcesModel = model<Iresources>("resources", resourcesSchema);

export default resourcesModel;
