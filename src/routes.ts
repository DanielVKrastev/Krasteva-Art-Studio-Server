import { Router } from "express";
import paintingsController from "./controllers/paintings-controller.js";
import categoriesController from "./controllers/categories-controller.js";
import sizesController from "./controllers/sizes-controller.js";
import aboutController from "./controllers/about-controller.js";

const routes = Router();

routes.use('/paintings', paintingsController);
routes.use('/categories', categoriesController);
routes.use('/sizes', sizesController);
routes.use('/about', aboutController);

export default routes;