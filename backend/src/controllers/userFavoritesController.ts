import FavoritesService from "../services/FavoritesService";
import { Request, Response, Router, RequestHandler } from "express";
import { Express } from "express";

class FavoritesController {
  public favoritesService: FavoritesService = new FavoritesService();
  private router = Router();

  constructor() {}
  
  public FavoritesRoutes(app: Express): void {
    // Define routes
    this.router.get("/", this.getFavorites); // Fetch favorites
    this.router.post("/", this.addFavorite); // Add a favorite

    // Register the router with the app
    app.use("/api/favorites", this.router);
  }

  // Handler to fetch favorites
  private getFavorites: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.userId as string; // Get `userId` from query string

      if (!userId) {
        res.status(400).json({ error: "User ID is required to fetch favorites." });
        return;
      }

      const favorites = await this.favoritesService.getUserFavorites(userId);

      // Check if favorites exist
      if (!favorites) {
        res.status(404).json({ message: "No favorites found for the provided user." });
        return;
      }

      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // Handler to add a favorite
  private addFavorite: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, resourceId } = req.body; // Expect `userId` and `resourceId` in the request body

      if (!userId || !resourceId) {
        res.status(400).json({ error: "User ID and Resource ID are required to add a favorite." });
        return;
      }

      const updatedFavorites = await this.favoritesService.addUserFavorite(userId, resourceId);

      res.status(200).json({
        message: "Favorite added successfully.",
        favorites: updatedFavorites,
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}

export default new FavoritesController(); // Export a singleton instance of the controller
