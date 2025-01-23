import UserFavorites from "../models/userFavoritesModel";
import IuserFavorites from "@/interface/IuserFavorites";
import userFavoritesModel from "@/models/userFavoritesModel";
import { Types } from "mongoose";



class FavoritesService {
  // Fetch user favorites
  public async getUserFavorites(userId: string) {
    return UserFavorites.findOne({ userId: new Types.ObjectId(userId) }).populate("favorites.resourceId");
  }

  // Add a new favorite for a user
  public async addUserFavorite(userId: string, resourceId: string) {
    return UserFavorites.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      {
        $addToSet: { favorites: { resourceId: new Types.ObjectId(resourceId) } }, // Prevent duplicates
      },
      { new: true, upsert: true } // Create the document if it doesn't exist
    );
  }
}

export default FavoritesService;
