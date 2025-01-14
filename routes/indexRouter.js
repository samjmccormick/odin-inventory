const { Router } = require("express");
const indexRouter = Router();
const {
  getTrainers,
  createTrainerGet,
  createTrainerPost,
  getTrainerById,
  deleteTrainerById,
  trainerUpdateGet,
  trainerUpdatePost,
} = require("../controllers/indexController");

indexRouter.get("/", getTrainers);

indexRouter.get("/new", createTrainerGet);

indexRouter.post("/new", createTrainerPost);

indexRouter.get("/trainers/:id", getTrainerById);

indexRouter.post("/trainers/:id", deleteTrainerById);

indexRouter.get("/trainers/:id/update", trainerUpdateGet);

indexRouter.post("/trainers/:id/update", trainerUpdatePost);

module.exports = indexRouter;
