const db = require('../../data/dbConfig')



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
