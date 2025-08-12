import { Router } from "express";
import paintingsController from "./controllers/paintings-controller.js";

const routes = Router();

routes.use('/paintings', paintingsController);

export default routes;