import { Router, Request, Response } from "express";

const paintingsController = Router(); 

paintingsController.get('/', async (req: Request, res: Response) => {
    res.status(200).json('Paintings')
});

export default paintingsController;