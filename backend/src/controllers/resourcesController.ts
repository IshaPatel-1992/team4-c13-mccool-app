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
        this.router.get("/:id", this.getResourceById);

        app.use("/api/resources", this.router);
    }

    private getResources: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const contentType = req.query.contentType as string;
            const tags = req.query.tags as string;
            const id = req.query.id as string;

            let filter: Record<string, any> = {}; // Empty object

            if (id) {
                if (ObjectId.isValid(id)) {
                    filter = { _id: new ObjectId(id) };
                } else {
                    res.status(400).json({ error: "Invalid ID format" });
                    return;
                }
            } 
            if (contentType) {
                const validContentTypes = ["article", "video", "podcast", "book", "other"];
                if (validContentTypes.includes(contentType)) {
                    filter.contentType = contentType;
                } else {
                    res.status(400).json({ error: "Invalid contentType value" });
                    return;
                }
            }
            if (tags) {
                filter.tags = { $regex: tags, $options: "i" };
            }

            const result = await this.resourcesService.getMany(filter);

            if (!result || result.length === 0) {
                res.status(404).json({ message: "No resources found." });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

    private getResourceById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!ObjectId.isValid(id)) {
                res.status(400).json({ error: "Invalid ID format" });
                return;
            }

            const resource = await this.resourcesService.getOne(id);

            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).json({ message: "Resource not found" });
            }
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}

export default new resourcesController();
