const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainers");
  return rows;
}

async function getTrainerById(id) {
  const { rows } = await pool.query("SELECT * FROM trainers WHERE id = $1", [
    id,
  ]);
  return rows;
}

async function getPokemonByName(pokemon) {
  const count = pokemon.map((_, index) => `$${index + 1}`).join(", ");
  const { rows } = await pool.query(
    `SELECT * FROM pokemon WHERE name in (${count})`,
    pokemon
  );
  return rows;
}

async function addTrainer(trainer) {
  // extract keys and values from trainer input object
  const keys = Object.keys(trainer);
  let values = Object.values(trainer);
  // create an array to hold the count of values that are not empty
  let count = [];
  let j = 1;
  const len = values.length;
  // iterate through all values, set to lowercase, and push values that exist to end of array
  // also push the count of values that are not empty to count array
  for (let i = 0; i < len; i++) {
    values[i] &&
      values.push(values[i].toLowerCase()) &&
      count.push(`$${j}`) &&
      j++;
  }
  // remove the empty values from beginning of array
  values.splice(0, len);
  // slice away the fields that are not needed from keys. That way all pokemon will be added to slots
  // numerically and not by name
  let updatedKeys = keys.slice(0, values.length);

  const query = `INSERT INTO trainers (${updatedKeys.join(
    ", "
  )}) VALUES (${count.join(", ")})`;
  console.log(values);
  await pool.query(query, values);
}

module.exports = {
  getAllPokemon,
  getAllTrainers,
  addTrainer,
  getTrainerById,
  getPokemonByName,
};
