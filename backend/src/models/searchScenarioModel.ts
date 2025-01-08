import IsearchScenario from "@/interface/IsearchScenario";
import searchScenarioSchema from "@/schemas/searchScenarioSchema";
import { model } from "mongoose";

const searchScenariosModel = model<IsearchScenario>("searchScenarios", searchScenarioSchema);

export default searchScenariosModel;