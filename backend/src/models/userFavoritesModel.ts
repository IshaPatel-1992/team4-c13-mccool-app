import { model } from "mongoose";
import IuserFavorites from "../interface/IuserFavorites";
import userFavoritesSchema from "../schemas/userFavoritesSchema";

const userFavoritesModel = model<IuserFavorites>("UserFavorites", userFavoritesSchema);

export default userFavoritesModel;
