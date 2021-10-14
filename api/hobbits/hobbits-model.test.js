const db = require('../../data/dbConfig')
const Hobbit = require('./hobbits-model')

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

test('environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('Hobbit.get()', () => {
  it('returns all (4) hobbits', async () => {
    // use the function to get data, store it in var
    // assert that the length of the structure is 4
    const hobbits = await Hobbit.getAll()
    expect(hobbits).toHaveLength(4)
  })
  it.todo('hobbits returned are of the correct shape')
})
