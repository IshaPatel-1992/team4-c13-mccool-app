import DataAccess from "@/databaseAccess/dataAccess";
import Iresources from "@/interface/Iresources";
import resourcesModel from "@/models/resourcesModel";

class resources extends DataAccess<Iresources> {
  constructor() {
    super(resourcesModel);
  }

  async getOne(id: string): Promise<Iresources | null> {
    return super.getOne(id);
  }

  async getMany(filter: object = {}): Promise<Iresources[]> {
    return super.getMany(filter);
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

export default resources;