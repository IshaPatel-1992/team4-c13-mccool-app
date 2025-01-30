import DataAccess from "../databaseAccess/dataAccess";
import Iresources from "../interface/Iresources";
import resourcesModel from "../models/resourcesModel";
import { ObjectId } from "mongodb"; // Import ObjectId for type-checking and query purposes

class resourcesService extends DataAccess<Iresources> {
  constructor() {
    super(resourcesModel);
  }

  // Fetch a single resource by its ID
  async getOne(id: string): Promise<Iresources | null> {
    try {
      // Validate if the provided ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }
      // Convert the ID to an ObjectId and fetch the resource
      return super.getOne(id);
    } catch (error) {
      throw new Error(`Error fetching resource: ${(error as Error).message}`);
    }
  }

  // Fetch multiple resources with a filter
  async getMany(filter: object = {}): Promise<Iresources[]> {
    try {
      const results = await super.getMany(filter);
      return Array.isArray(results) ? results : []; // Ensure it always returns an array
    } catch (error) {
      throw new Error(`Error fetching resources: ${(error as Error).message}`);
    }
  }

  // Insert a single resource
  /*async insertOne(data: Partial<Iresources>): Promise<Iresources> {
    try {
      return super.insertOne(data);
    } catch (error) {
      throw new Error(`Error inserting resource: ${(error as Error).message}`);
    }
  }*/

    async insertOne(data: Partial<Iresources>) {
      const resource = new resourcesModel(data);  // Create a new instance of the model
      const savedResource = await resource.save(); // Save to the database
      return savedResource; // Return the saved document
  }


  // Insert multiple resources
  async insertMany(data: Partial<Iresources>[]): Promise<Iresources[]> {
    try {
      return super.insertMany(data);
    } catch (error) {
      throw new Error(`Error inserting resources: ${(error as Error).message}`);
    }
  }

  // Update a single resource
  async updateOne(id: string, data: Partial<Iresources>): Promise<Iresources | null> {
    try {
      // Validate if the provided ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }
      return super.updateOne(id, data);
    } catch (error) {
      throw new Error(`Error updating resource: ${(error as Error).message}`);
    }
  }

  // Delete a single resource
  async deleteOne(id: string): Promise<Iresources | null> {
    try {
      // Validate if the provided ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }
      return super.deleteOne(id);
    } catch (error) {
      throw new Error(`Error deleting resource: ${(error as Error).message}`);
    }
  }
}

export default resourcesService;
