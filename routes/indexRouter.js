const { Router } = require("express");
const indexRouter = Router();
const { getTrainers } = require("../controllers/indexController");

indexRouter.get("/", getTrainers);

module.exports = indexRouter;
