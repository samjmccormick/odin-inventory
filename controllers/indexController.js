const db = require("../db/queries.js");

async function getTrainers(req, res) {
  const trainers = await db.getAllTrainers();
  const trainer = await db.getTrainerById(1);
  const pokemon = await db.getPokemonByName([
    trainer[0].pokemon1,
    trainer[0].pokemon2,
    trainer[0].pokemon3,
    trainer[0].pokemon4,
    trainer[0].pokemon5,
    trainer[0].pokemon6,
  ]);

  res.render("index", {
    trainers: trainers,
    trainer: trainer[0],
    pokemon: pokemon,
  });
}

async function createTrainerGet(req, res) {
  const trainers = await db.getAllTrainers();

  res.render("trainerForm", { trainers: trainers });
}

async function createTrainerPost(req, res) {
  const trainer = req.body;
  await db.addTrainer(trainer);
  res.redirect("/");
}

async function getTrainerById(req, res) {
  const trainers = await db.getAllTrainers();
  const trainer = await db.getTrainerById(req.params.id);
  const pokemon = await db.getPokemonByName([
    trainer[0].pokemon1,
    trainer[0].pokemon2,
    trainer[0].pokemon3,
    trainer[0].pokemon4,
    trainer[0].pokemon5,
    trainer[0].pokemon6,
  ]);
  res.render("index", {
    trainer: trainer[0],
    trainers: trainers,
    pokemon: pokemon,
  });
}

async function trainerUpdateGet(req, res) {
  const trainers = await db.getAllTrainers();
  const trainer = await db.getTrainerById(req.params.id);
  res.render("trainerUpdateForm", { trainer: trainer[0], trainers: trainers });
}

async function trainerUpdatePost(req, res) {
  const trainer = req.body;
  await db.updateTrainer(trainer, req.params.id);
  res.redirect("/");
}

async function deleteTrainerById(req, res) {
  await db.deleteTrainer(req.params.id);
  res.redirect("/");
}

module.exports = {
  getTrainers,
  createTrainerGet,
  createTrainerPost,
  getTrainerById,
  deleteTrainerById,
  trainerUpdateGet,
  trainerUpdatePost,
};
