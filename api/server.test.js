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
  let res
  beforeEach(async () => {
    res = await request(server).get('/hobbits')
  })
  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200)
  })
  it('responds with all (4) the hobbits', async () => {
    expect(res.body).toHaveLength(4)
  })
  it('responds with the correct data structure', async () => {
    expect(res.body).toMatchObject([
      { id: 1, name: 'sam' },
      { id: 2, name: 'frodo' },
      { id: 3, name: 'pippin' },
      { id: 4, name: 'merry' },
    ])
  })
})
describe('[POST] /hobbits', () => {
  let res
  beforeEach(async () => {
    res = await request(server).post('/hobbits').send({ name: 'bilbo' })
  })
  it('responds with 201 CREATED', async () => {
    expect(res.status).toBe(201)
  })
  it('causes a hobbit to be added to the db', async () => {
    
  })
  it.todo('responds with the newly created hobbit')
})
