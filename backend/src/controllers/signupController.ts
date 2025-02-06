import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import UsersModel from "../models/UsersModel";
import { Express } from "express";

class SignupController {
  private router = Router();

  constructor() {}

  public signupRoutes(app: Express): void {
    this.router.post("/signup", this.signupUser);
    this.router.get("/searchUser", this.searchUser); // Search bar functionality
    app.use("/api", this.router);
  }

  // ** Manual Signup (Email & Password) **
  private signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UsersModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UsersModel({
        name,
        email,
        password: hashedPassword,
        authProvider: "manual",
      });

      await newUser.save();
      res.status(201).json({ message: "Signup successful, please log in." });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  };

  // ** Quick Search (Check if Email Exists Before Signup) **
  private searchUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.email as string;

      if (!query) {
        res.status(400).json({ message: "Email query parameter is required." });
        return;
      }

      const existingUser = await UsersModel.findOne({ email: new RegExp(query, "i") });

      if (existingUser) {
        res.status(200).json({ message: "User already exists", user: existingUser });
      } else {
        res.status(404).json({ message: "No user found with this email." });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  };
}

export default new SignupController();
