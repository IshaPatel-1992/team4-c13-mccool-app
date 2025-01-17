import QuickSearchService from "@/services/quickSearchService";
import { Request, Response, Router } from "express";
import { Express } from "express";

export default class QuickSearchController {
    public quickSearchService: QuickSearchService = new QuickSearchService();
    public quickSearchbarRoutes(app: Express): void {
      app.routes("/api/quickSearch").get(this.quickSearch);
    }
    private quickSearch = async (req: Request, res: Response) => {
      try {
        const query = req.query.searchScenario as string;
        const search = {searchScenario: RegExp(query, "i")};
        const result = await this.quickSearchService.getMany(search);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    };
  }