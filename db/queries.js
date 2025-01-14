const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainers");
  return rows;
}

module.exports = {
  getAllPokemon,
  getAllTrainers,
};
