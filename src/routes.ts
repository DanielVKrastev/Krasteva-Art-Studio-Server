import { Router } from "express";
import paintingsController from "./controllers/paintings-controller.js";
import categoriesController from "./controllers/categories-controller.js";
import sizesController from "./controllers/sizes-controller.js";

const routes = Router();

routes.use('/paintings', paintingsController);
routes.use('/categories', categoriesController);
routes.use('/sizes', sizesController);

export default routes;