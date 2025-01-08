import { connectToDatabase } from "./src/databaseAccess/database";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
