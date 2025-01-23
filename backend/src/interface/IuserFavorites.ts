import { Document, Types } from "mongoose";

export default interface IuserFavorites extends Document {
  userId: Types.ObjectId; // Use Mongoose's ObjectId type by referencing to the User from 'UserSchema'
  favorites: {
    resourceId: Types.ObjectId; // Use Mongoose's ObjectId type by referencing to the Resources from 'ResourcesSchema'
    addedAt: Date; // Timestamp when the resource was added
  }[];
}
