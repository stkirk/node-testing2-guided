const db = require("../../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db("hobbits");
}

function getById(id) {
  return null;
}

async function insert(hobbit) {
  const [id] = await db("hobbits").insert(hobbit);
  return db("hobbits").where({ id }).first();
}

async function update(id, changes) {
  return db("hobbits").update(changes).where({ id });
}

function remove(id) {
  return null;
}
