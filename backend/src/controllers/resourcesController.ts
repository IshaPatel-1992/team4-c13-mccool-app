
import resourcesService from "../services/resourcesService";
import { Request, Response, Router, RequestHandler } from "express";
import { Express } from "express";

class resourcesController {
    public resourcesService: resourcesService = new resourcesService();
    private router = Router();

    constructor() { }

    public resourcesRoutes(app: Express): void {
        this.router.get("/", this.getResources);
        app.use("/api/resources", this.router);
    }

    private getResources: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query.contentType as string; // Get query from URL: /api/resources?contentType=audio/video/article/blog/podcast
            console.log("Query is: ", query);
            let filter = {}; // Empty object

            if (query) {
                filter = { contentType: RegExp(query, "i") };
            }
            const result = await this.resourcesService.getMany(filter);
            //return result || []; // Return an empty array if results are null/undefined
            console.log("Result is: ", result);
            // Handle empty results
            if (!Array.isArray(result) || result.length === 0) {
                res.status(404).json({ message: "No results found for the resources." });
                return;
            }

            // If results are found, send them
            res.status(200).json(result);
            console.log("Resources are: ", result);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}

export default new resourcesController(); 

