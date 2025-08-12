import { Router, Request, Response } from "express";
import paintingsService from "../services/paintings-service.js";

const paintingsController = Router();

paintingsController.get('/', async (req: Request, res: Response) => {
    try {
        let data;
        let limitRaw = req.query.limit;

        let limit: number | undefined;

        if (limitRaw !== undefined) {
            if (typeof limitRaw === 'string') {
                limit = parseInt(limitRaw);
            } else if (typeof limitRaw === 'number') {
                limit = limitRaw;
            } else {
                // if array or ParsedQs - error
                return res.status(400).json({ error: 'Invalid limit parameter' });
            }

            if (isNaN(limit)) {
                return res.status(400).json({ error: 'Limit must be a valid number' });
            }
        }

        if (limit !== undefined) {
            data = await paintingsService.getAllLimit(limit);
        } else {
            data = await paintingsService.getAll();
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

export default paintingsController;