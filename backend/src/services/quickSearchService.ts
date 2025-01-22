import DataAccess from "../databaseAccess/dataAccess";
import IsearchScenario from "../interface/IsearchScenario";
import searchScenarioModel from "../models/searchScenarioModel";

class QuickSearchService extends DataAccess<IsearchScenario> {
  constructor() {
    super(searchScenarioModel);
  }

  async getOne(id: string): Promise<IsearchScenario | null> {
    return super.getOne(id);
  }

  async getMany(filter: object = {}): Promise<IsearchScenario[]> {
    return super.getMany(filter);
  }

  async insertOne(data: Partial<IsearchScenario>): Promise<IsearchScenario> {
    return super.insertOne(data);
  }

  async insertMany(data: Partial<IsearchScenario>[]): Promise<IsearchScenario[]> {
    return super.insertMany(data);
  }

  async updateOne(id: string, data: Partial<IsearchScenario>): Promise<IsearchScenario | null> {
    return super.updateOne(id, data);
  }

  async deleteOne(id: string): Promise<IsearchScenario | null> {
    return super.deleteOne(id);
  }
}

export default QuickSearchService;