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
  let hobbits
  beforeEach(async () => {
    hobbits = await Hobbit.getAll()
  })
  it('returns all (4) hobbits', async () => {
    // use the function to get data, store it in var
    // assert that the length of the structure is 4
    expect(hobbits).toHaveLength(4)
  })
  it('hobbits returned are of the correct shape', async () => {
    expect(hobbits).toMatchObject([
      { id: 1, name: 'sam' },
      { id: 2, name: 'frodo' },
      { id: 3, name: 'pippin' },
      { id: 4, name: 'merry' },
    ])
    expect(hobbits[0]).toMatchObject({ name: 'sam' })
    expect(hobbits[1]).toMatchObject({ name: 'frodo' })
    expect(hobbits[2]).toMatchObject({ name: 'pippin' })
    expect(hobbits[3]).toMatchObject({ name: 'merry' })
  })
})
describe('Hobbit.getById(id)', () => {
  it.todo('')
})
