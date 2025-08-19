import { Router, Request, Response } from "express";
import sizesService from "../services/sizes-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import mongoose from "mongoose";

const sizesController = Router();

sizesController.get('/', async (req: Request, res: Response) => {
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
            data = await sizesService.getAllLimit(limit);
        } else {
            data = await sizesService.getAll();
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

sizesController.get('/:sizeId', async (req: Request, res: Response) => {
    let sizeId = req.params.sizeId as string;
    
    if(!mongoose.Types.ObjectId.isValid(sizeId)) {
        return res.status(400).json({ error: 'Invalid Size ID'});
    }

    try {
        const data = await sizesService.getOne(sizeId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

sizesController.post('/', async (req: Request, res: Response) => {
    
    try{
        const data: object = req.body;

        const createdData = await sizesService.create(data);
        res.status(200).json(createdData);
    }catch(error) {
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }

});

sizesController.patch('/:sizeId', async (req: Request, res: Response) => {
    let sizeId = req.params.sizeId as string;

    if(!mongoose.Types.ObjectId.isValid(sizeId)) {
        return res.status(400).json({ error: 'Invalid Size ID'});
    }

    const newData: object = req.body;

    try{
        const updatedData = await sizesService.update(sizeId, newData);

        if(!updatedData) {
            return res.status(400).json({error: 'Size not found.'});
        }

        return res.status(200).json(updatedData);

    }catch(error){
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }
});


export default sizesController;