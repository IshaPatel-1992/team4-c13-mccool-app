import DataAccess from "../databaseAccess/dataAccess"
import Iresources from "../interface/Iresources";
import resourcesModel from "../models/resourcesModel";

class resourcesService extends DataAccess<Iresources> {
  constructor() {
    super(resourcesModel);
  }

  async getOne(id: string): Promise<Iresources | null> {
    return super.getOne(id);
  }

  /*async getMany(filter: object = {}): Promise<Iresources[]> {
    return super.getMany(filter);
  }*/

  async getMany(filter: object = {}): Promise<Iresources[]> {
      const results = await super.getMany(filter);
      return Array.isArray(results) ? results : []; // Ensure it always returns an array
  }

  async insertOne(data: Partial<Iresources>): Promise<Iresources> {
    return super.insertOne(data);
  }

  async insertMany(data: Partial<Iresources>[]): Promise<Iresources[]> {
    return super.insertMany(data);
  }

  async updateOne(id: string, data: Partial<Iresources>): Promise<Iresources | null> {
    return super.updateOne(id, data);
  }

  async deleteOne(id: string): Promise<Iresources | null> {
    return super.deleteOne(id);
  }
}

export default resourcesService;