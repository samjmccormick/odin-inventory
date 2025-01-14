const db = require("../db/queries.js");

async function getTrainers(req, res) {
  const trainers = await db.getAllTrainers();
  console.log(trainers);
  res.render("index", { trainers: trainers });
}

module.exports = {
  getTrainers,
};
