const { Router } = require("express");
const indexRouter = Router();
const {
  getTrainers,
  createTrainerGet,
  createTrainerPost,
  getTrainerById,
} = require("../controllers/indexController");

indexRouter.get("/", getTrainers);

indexRouter.get("/new", createTrainerGet);

indexRouter.post("/new", createTrainerPost);

indexRouter.get("/trainers/:id", getTrainerById);

module.exports = indexRouter;
