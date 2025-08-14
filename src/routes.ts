import { Router } from "express";
import paintingsController from "./controllers/paintings-controller.js";
import categoriesController from "./controllers/categories-controller.js";

const routes = Router();

routes.use('/paintings', paintingsController);
routes.use('/categories', categoriesController);

export default routes;