const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('[GET] /hobbits', () => {
  it('responds with 200 OK', async () => {
    const res = await request(server).get('/hobbits')
    expect(res.status).toBe(200)
  })
  it('responds with all (4) the hobbits', async () => {
    
  })
})
