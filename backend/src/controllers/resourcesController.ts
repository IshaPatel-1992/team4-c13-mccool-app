
import resourcesService from "../services/resourcesService";
import { Request, Response, Router, RequestHandler } from "express";
import { Express } from "express";
import { ObjectId } from "mongodb"; // Import ObjectId

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
            const contentType = req.query.contentType as string; // Get query from URL: /api/resources?contentType=audio,video,article,blog,podcast etc
            const tags = req.query.tags as string; // Get query from URL: /api/resources?tags=leadership,management,productivity,etc
            const id = req.query.id as string; // Get query from URL: /api/resources?id=1234567890

            let filter = {}; // Empty object

            if (id) {
                // Check if id is a valid ObjectId
                if (ObjectId.isValid(id)) {
                    filter = { _id: new ObjectId(id) }; // Match by _id as ObjectId
                } else {
                    res.status(400).json({ error: "Invalid ID format" });
                    return;
                }
            } else if (contentType) {
                filter = { contentType: RegExp(contentType, "i") };
            } else if (tags) {
                filter = { tags: RegExp(tags, "i") };
            } else if (id) {
                filter = { id: RegExp(id, "i") };
            } else {
                filter = {};
            }

            const result = await this.resourcesService.getMany(filter);             
            
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