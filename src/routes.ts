import { Router } from "express";
import paintingsController from "./controllers/paintings-controller.js";
import categoriesController from "./controllers/categories-controller.js";
import sizesController from "./controllers/sizes-controller.js";
import aboutController from "./controllers/about-controller.js";
import ordersController from "./controllers/orders-controller.js";

const routes = Router();

routes.use('/paintings', paintingsController);
routes.use('/categories', categoriesController);
routes.use('/sizes', sizesController);
routes.use('/about', aboutController);
routes.use('/orders', ordersController);

export default routes;