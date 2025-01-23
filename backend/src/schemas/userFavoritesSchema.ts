import { Schema } from "mongoose";
import IuserFavorites from "../interface/IuserFavorites";

const userFavoritesSchema = new Schema<IuserFavorites>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users", // Reference to the User schema
    required: true,
  },
  favorites: [
    {
      resourceId: {
        type: Schema.Types.ObjectId,
        ref: "resources", // Reference to the Resource schema
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now, // Automatically set to the current timestamp
      },
    },
  ],
});

export default userFavoritesSchema;
