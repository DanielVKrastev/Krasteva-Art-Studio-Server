import { Router, Request, Response } from "express";
import categoriesService from "../services/categories-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import mongoose from "mongoose";

const categoriesController = Router();

categoriesController.get('/', async (req: Request, res: Response) => {
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
            data = await categoriesService.getAllLimit(limit);
        } else {
            data = await categoriesService.getAll();
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

categoriesController.get('/:categoryId', async (req: Request, res: Response) => {
    let categoryId = req.params.categoryId as string;
    
    if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: 'Invalid Category ID'});
    }

    try {
        const data = await categoriesService.getOne(categoryId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error })
    }
});

categoriesController.post('/', async (req: Request, res: Response) => {
    
    try{
        const data: object = req.body;

        const createdData = await categoriesService.create(data);
        res.status(200).json(createdData);
    }catch(error) {
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }

});

categoriesController.patch('/:categoryId', async (req: Request, res: Response) => {
    let categoryId = req.params.categoryId as string;

    if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: 'Invalid Category ID'});
    }

    const newData: object = req.body;

    try{
        const updatedData = await categoriesService.update(categoryId, newData);

        if(!updatedData) {
            return res.status(400).json({error: 'Category not found.'});
        }

        return res.status(200).json(updatedData);

    }catch(error){
        const errorMessage = getErrorMessage(error);
        return res.status(400).json({ error: errorMessage });
    }
});

export default categoriesController;