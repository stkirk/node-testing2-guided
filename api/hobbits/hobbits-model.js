const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where("id", id).first()
}

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit)
  return getById(id) /// not necessary with Postgres

  // const [inserted] = await db('hobbits')
  //   .insert(hobbit, ['id', 'name']) // POSTGRES WAY
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
