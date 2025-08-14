import { Router, Request, Response } from "express";
import paintingsService from "../services/paintings-service.js";
import mongoose from "mongoose";
import { getErrorMessage } from "../utils/errorUtils.js";

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

paintingsController.get('/:paintingId', async (req: Request, res: Response) => {
    let paintingId = req.params.paintingId as string;
    
    if(!mongoose.Types.ObjectId.isValid(paintingId)) {
        return res.status(400).json({ error: 'Invalid Painting ID'});
    }

    try {
        const data = await paintingsService.getOne(paintingId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

paintingsController.post('/', async (req: Request, res: Response) => {
    
    try{
        const data: object = req.body;

        const createdData = await paintingsService.create(data);
        res.status(200).json(createdData);
    }catch(error) {
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }

});

paintingsController.patch('/:paintingId', async (req: Request, res: Response) => {
    let paintingId = req.params.paintingId as string;

    if(!mongoose.Types.ObjectId.isValid(paintingId)) {
        return res.status(400).json({ error: 'Invalid Painting ID'});
    }

    const newData: object = req.body;

    try{
        const updatedData = await paintingsService.update(paintingId, newData);

        if(!updatedData) {
            return res.status(400).json({error: 'Painting not found.'});
        }

        return res.status(200).json(updatedData);

    }catch(error){
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }
});

export default paintingsController;