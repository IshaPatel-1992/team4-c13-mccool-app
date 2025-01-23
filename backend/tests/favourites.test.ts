import FavoritesService from "@/services/FavoritesService";
import mongoose from "mongoose";

describe("FavoritesService.addUserFavorite", () => {
  const favoritesService = new FavoritesService();

  it("should insert a record into the database", async () => {
    // Mock data
    const userId = "6786d29444f883a46914e65f"; // Example userId (ObjectId string)
    const resourceId = "678ea4a7d03b2877d1bd092f"; // Example resourceId (ObjectId string)

    // Call the addUserFavorite method
    const result = await favoritesService.addUserFavorite(userId, resourceId);

    // Convert `result.userId` to a string for comparison
    expect(result.userId.toString()).toBe(userId);

    // Convert `result.favorites[0].resourceId` to a string for comparison
    expect(result.favorites[0].resourceId.toString()).toBe(resourceId);

    expect(result.favorites[0].addedAt).toBeTruthy();
    console.log("Result:", result);

  });
});
