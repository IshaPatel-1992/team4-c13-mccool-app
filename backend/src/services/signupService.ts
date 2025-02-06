import DataAccess from "../databaseAccess/dataAccess";  // Base class for DB operations
import IUsers from "../interface/IUsers";  // User interface
import bcrypt from "bcrypt";  // For password hashing
import UsersModel from "../models/UsersModel";  // User model

class SignupService extends DataAccess<IUsers> {
  constructor() {
    super(UsersModel);  // Pass the user model to the base class
  }

  // ** Check if a user already exists by email **
  async findByEmail(email: string): Promise<IUsers | null> {
    return this.model.findOne({ email }).exec();  // Use model from the base class
  }

  // ** Create a new user with a hashed password **
  async createUser(data: Partial<IUsers>): Promise<IUsers> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password as string, 10);
    const newUser = new this.model({
      ...data,
      password: hashedPassword,  // Store the hashed password
    });

    return newUser.save();  // Save the user to the database
  }

  // ** Update user details **
  async updateUser(id: string, data: Partial<IUsers>): Promise<IUsers | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();  // Use base model to update
  }

  // ** Delete a user by ID **
  async deleteUser(id: string): Promise<IUsers | null> {
    return this.model.findByIdAndDelete(id).exec();  // Use base model to delete
  }

  // ** Retrieve all users **
  async getAllUsers(): Promise<IUsers[]> {
    return this.model.find({}).exec();  // Use base model to find all users
  }
}

export default SignupService;
