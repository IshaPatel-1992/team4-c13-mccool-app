import IsearchScenario from "../interface/IsearchScenario";
import searchScenarioSchema from "../schemas/searchScenarioSchema";
import { model } from "mongoose";

const searchScenarioModel = model<IsearchScenario>("quick_searchbar1", searchScenarioSchema);

export default searchScenarioModel;