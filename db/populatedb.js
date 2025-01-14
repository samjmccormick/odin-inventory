const { Client } = require("pg");
require("dotenv").config();

const initialTrainer = {
  name: "Ash Ketchum",
  age: 10,
  hometown: "Pallet Town",
  pokemon: {
    pokemon1: "Pikachu",
    pokemon2: "Bulbasaur",
    pokemon3: "Charmander",
    pokemon4: "Squirtle",
    pokemon5: "Lapras",
    pokemon6: "Primeape",
  },
};

const SQL = `
CREATE TABLE IF NOT EXISTS pokemon (
  id INT NOT NULL ,
  name VARCHAR ( 50 ) PRIMARY KEY UNIQUE,
  spriteUrl VARCHAR ( 100 ),
  weight INT,
  height INT,
  hp INT,
  attack INT,
  defense INT,
  spattack INT,
  spdefense INT,
  speed INT,
  type1 VARCHAR ( 50 ),
  type2 VARCHAR ( 50 ),
  ability VARCHAR ( 50 )
);

CREATE TABLE IF NOT EXISTS trainers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT,
  hometown VARCHAR(100),
  pokemon1 VARCHAR ( 50 ) REFERENCES pokemon(name) ,
  pokemon2 VARCHAR ( 50 ) REFERENCES pokemon(name) ,
  pokemon3 VARCHAR ( 50 ) REFERENCES pokemon(name) ,
  pokemon4 VARCHAR ( 50 ) REFERENCES pokemon(name) ,
  pokemon5 VARCHAR ( 50 ) REFERENCES pokemon(name) ,
  pokemon6 VARCHAR ( 50 ) REFERENCES pokemon(name) 
);
`;

async function apiPull(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();
  return data;
}

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST, // or wherever the db is hosted
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT, // The default port
  });
  await client.connect();
  await client.query(SQL);
  //populate pokemon table with original 150 pokemon (should initially populate with just the trainer pokemon to speed loading time)
  for (let i = 1; i < 151; i++) {
    const data = await apiPull(i);
    const {
      name,
      sprites: { front_default },
      weight,
      height,
      id,
      stats,
      types,
      abilities,
    } = data;
    const [hp, attack, defense, spAttack, spDefense, speed] = stats.map(
      (stat) => stat.base_stat
    );
    //type isn't working for some reason
    const type1 = types[0].type.name;
    const type2 = types[1] ? types[1].type.name : null;
    const ability = abilities[0].ability.name;
    const query = {
      text: `INSERT INTO pokemon (id, name, spriteUrl, weight, height, hp, attack, defense, spattack, spdefense, speed, type1, type2, ability) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      values: [
        id,
        name,
        front_default,
        weight,
        height,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed,
        type1,
        type2,
        ability,
      ],
    };
    await client.query(query);
  }
  //populate trainer table for initial trainer
  const query = {
    text: `INSERT INTO trainers (name, age, hometown, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [
      initialTrainer.name,
      initialTrainer.age,
      initialTrainer.hometown,
      initialTrainer.pokemon.pokemon1.toLowerCase(),
      initialTrainer.pokemon.pokemon2.toLowerCase(),
      initialTrainer.pokemon.pokemon3.toLowerCase(),
      initialTrainer.pokemon.pokemon4.toLowerCase(),
      initialTrainer.pokemon.pokemon5.toLowerCase(),
      initialTrainer.pokemon.pokemon6.toLowerCase(),
    ],
  };
  await client.query(query);
  await client.end();
  console.log("done");
}

main();
