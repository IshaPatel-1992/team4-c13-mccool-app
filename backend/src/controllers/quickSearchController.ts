import QuickSearchService from "../services/quickSearchService";
import { Request, Response, Router, RequestHandler } from "express";
import { Express } from "express";

class QuickSearchController {
  public quickSearchService: QuickSearchService = new QuickSearchService();
  private router = Router();

  constructor() {}

  public quickSearchRoutes(app: Express): void {
    this.router.get("/", this.quickSearch); // No type casting needed
    app.use("/api/quickSearch", this.router);
  }

  private quickSearch: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.scenario as string; // Get query from URL: /api/quickSearch?scenario=...
      let filter = {}; // Empty object

      if (query) {
        filter = { search_criteria: RegExp(query, "i") };
      }

      const result = await this.quickSearchService.getMany(filter);

      // Handle empty results
      if (!result.length) {
        res.status(404).json({ message: "No results found for the provided scenario." });
        return; // Ensure no further execution
      }

      // If results are found, send them
      res.status(200).json(result);
      console.log("Quick search result: ", result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}

export default new QuickSearchController(); // Export a singleton instance of the controller
