import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//list items
routes.get("/items", itemsController.index);

//Register a facility
routes.post("/points", pointsController.create);
//list facilities
routes.get("/points", pointsController.index);
//list an specific facility
routes.get("/points/:id", pointsController.show);

export default routes;
